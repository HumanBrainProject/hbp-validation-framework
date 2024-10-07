"""
Tests of the User class

Note: These will fail if the test user's permissions are too elevated.
"""

import os

from fastapi.security import HTTPAuthorizationCredentials
import pytest

from ..auth import User


token = HTTPAuthorizationCredentials(
    credentials=os.environ["VF_TEST_TOKEN"], scheme="Bearer"
)


@pytest.mark.asyncio
async def test_user__is_admin():
    user = User(token, allow_anonymous=False)
    is_admin = await user.is_admin()
    assert not is_admin


@pytest.mark.asyncio
async def test_user_info():
    user = User(token, allow_anonymous=False)
    user_info = await user.get_user_info()
    assert "collab-model-validation-administrator" not in user_info["roles"]["team"]


@pytest.mark.asyncio
async def test_get_collab_permissions():
    user = User(token, allow_anonymous=False)
    permissions = await user.get_collab_permissions("model-validation")
    assert permissions == {
        "UPDATE": False,
        "VIEW": True,
    }


@pytest.mark.asyncio
async def test_can_view_collab():
    user = User(token, allow_anonymous=False)
    can_view = await user.can_view_collab("model-validation")
    assert can_view


@pytest.mark.asyncio
async def test_can_edit_collab():
    user = User(token, allow_anonymous=False)
    can_edit = await user.can_edit_collab("model-validation")
    assert not can_edit
