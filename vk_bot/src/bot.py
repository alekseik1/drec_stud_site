import datetime
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from loguru import logger
from vkbottle import load_blueprints_from_package
from vkbottle.bot import Bot

from src.middlewares import RedisMiddleware
from src.states import DatabaseState

basedir = Path(__file__).absolute().parent
load_dotenv(str(basedir.parent / ".env"))
TOKEN = os.environ["ACCESS_TOKEN"]

bot = Bot(TOKEN)
bot.state_dispenser = DatabaseState()

logger.remove()
logger.add(sys.stderr, level="DEBUG")
logger.add(
    basedir.parent / "logs/log_{time}.log",
    rotation=datetime.timedelta(days=1),
    retention=30,
    level="INFO",
)


bp_default = None
for bp in load_blueprints_from_package("blueprints"):
    if not bp.name == "default":
        bp.load(bot)
    else:
        bp_default = bp
else:
    if bp_default:
        bp_default.load(bot)


bot.labeler.message_view.register_middleware(RedisMiddleware)


if __name__ == "__main__":
    bot.run_forever()
