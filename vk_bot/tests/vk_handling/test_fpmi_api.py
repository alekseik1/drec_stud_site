from pathlib import Path

import pytest
from dotenv import load_dotenv
from pytest_cases import parametrize_with_cases

from src.utils import fpmi_check


@pytest.fixture(scope="session", autouse=True)
def envs():
    basedir = Path(__file__).absolute().parent
    load_dotenv(str(basedir.parent.parent / ".env"))


@pytest.mark.asyncio
@pytest.mark.integration
@parametrize_with_cases(cases=".cases_service_id", argnames="service_id")
async def test_admin_can_open_anytime(service_id):
    # GIVEN админский id, все токены для сайта
    # WHEN админ делает запрос на сайт
    # THEN приходит True от проверки
    # TODO поменяйте на свой ID, когда я уйду с фт
    assert await fpmi_check(vk_id=92540660, room_id=service_id)


@pytest.mark.asyncio
@pytest.mark.integration
@parametrize_with_cases(cases=".cases_service_id", argnames="service_id")
async def test_random_user_cannot_open(service_id):
    # GIVEN рандомный id, все токены для сайта
    # WHEN рандомный id делает запрос на сайт
    # THEN приходит False от проверки
    # TODO поменяйте на свой ID, когда я уйду с фт
    assert not await fpmi_check(vk_id=11111111, room_id=service_id)
