import os
from typing import Tuple

import aiohttp
from loguru import logger

BASE_DOOR_URL = "http://nginx/lockbox/{room_name}/{device}/{command}"


async def perform_lockbox_request(url: str) -> Tuple[int, str]:
    secret_bot_token = os.environ["SECRET_BOT_TOKEN"]
    logger.debug(f"performing request to {url}")
    async with aiohttp.ClientSession() as session:
        async with session.get(
            url, params={"secret_token": str(secret_bot_token)}
        ) as resp:
            status, response_text = resp.status, await resp.text()
            logger.debug(f"got response status={status} | text={response_text}")
            return status, response_text


async def send_signal_door_open(room_name: str = "5b") -> Tuple[int, str]:
    url = BASE_DOOR_URL.format(room_name=room_name, command="open", device="door")
    return await perform_lockbox_request(url)


async def send_signal_door_close(room_name: str = "5b"):
    url = BASE_DOOR_URL.format(room_name=room_name, command="close", device="door")
    logger.info("sending door `close` signal")
    return await perform_lockbox_request(url)
