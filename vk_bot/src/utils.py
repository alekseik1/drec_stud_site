import json
import aiohttp
import os

from loguru import logger
from vkbottle.bot import Message, rules
from vkbottle.tools.dev_tools.mini_types.bot.message import MessageMin
from typing import Union

from src.keyboards import KEYBOARD_ENTRYPOINT
from src.lockbox_api import send_signal_door_open, send_signal_door_close
from src.settings import UNLOCK_CHECK_URL, ADMIN_HARDCODED_LIST


def get_event_payload_cmd(event: MessageMin) -> Union[str, None]:
    try:
        payload = json.loads(event.payload)
    except (TypeError, json.JSONDecodeError):
        return None
    return payload.get('cmd')


async def is_eligible_to_open_door(vk_id: int, room_id: str):
    """
    Проверка, может ли юзер открыть дверь. Ходит на Django и у него спрашивает это
    """
    if vk_id in ADMIN_HARDCODED_LIST:
        return True
    async with aiohttp.ClientSession() as session:
        async with session.get(
                UNLOCK_CHECK_URL.format(
                    service_id={'5b': 2, '6b': 1}.get(room_id),
                ),
            params={'vk_id': vk_id}
        ) as resp:
            text = await resp.text()
            response = json.loads(text)
            if response.get('status', 'no') in ['yes', 'true', 'True']:
                return True
            else:
                return False


async def process_door_command(message: Message, room_id: str, display_room_name: str, do_open: bool):
    """
    Открыть/закрыть дверь с уведомлением в ЛС
    """
    # Для не-админов нужна проверка
    if not await is_eligible_to_open_door(message.from_id, room_id):
        await message.answer(
            message='Нет записи на текущее время в этой стиралке. Возврат в начало',
            keyboard=KEYBOARD_ENTRYPOINT
        )
        return
    try:
        status, content_text = await (
            send_signal_door_open(room_name=room_id) if do_open
            else send_signal_door_close(room_name=room_id)
        )
    except Exception as e:
        logger.error(f'Unknown error: {e}')
        await message.answer(
            message='Произошла неизвестная ошибка, '
                    'но разработчики смогут о ней узнать',
            keyboard=KEYBOARD_ENTRYPOINT
        )
        return
    if status != 200:
        logger.warning(f'response is invalid | status = {status} | content={content_text}')
        await message.answer(
            message=f'Запрос вернул status_code={status} != 200, так не должно быть. '
                    f'Вот контент: {content_text}',
            keyboard=KEYBOARD_ENTRYPOINT
        )
        return
    else:
        await message.answer(
            message=f'Дверь в {display_room_name} должна быть {"открыта" if do_open else "закрыта"}.',
            keyboard=KEYBOARD_ENTRYPOINT
        )


class LockboxTokenIsPresentRule(rules.ABCMessageRule):
    async def check(self, message: Message) -> Union[dict, bool]:
        token = os.environ.get('SECRET_BOT_TOKEN')
        if token is None:
            logger.warning('failure in token read')
            await message.answer(
                message='Мне не удалось считать токен, поэтому я не смогу управлять замком. Возврат в меню',
                keyboard=KEYBOARD_ENTRYPOINT
            )
            return False
        return True