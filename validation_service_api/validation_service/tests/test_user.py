"""
Tests of the User class

Note: These will fail if the test user's permissions are too elevated.
"""

import os

from fastapi.security import HTTPAuthorizationCredentials
import pytest

from ..auth import User
from .fixtures import requires_token



token = HTTPAuthorizationCredentials(
    credentials=os.environ.get("VF_TEST_TOKEN", ""), scheme="Bearer"
)


@pytest.mark.asyncio
@requires_token
async def test_user__is_admin():
    user = User(token, allow_anonymous=False)
    is_admin = await user.is_admin()
    assert not is_admin


@pytest.mark.asyncio
@requires_token
async def test_user_teams():
    user = User(token, allow_anonymous=False)
    teams = await user.get_teams()
    assert "collab-model-validation-administrator" not in teams


@pytest.mark.asyncio
@requires_token
async def test_get_collab_permissions():
    user = User(token, allow_anonymous=False)
    permissions = await user.get_collab_permissions("model-validation")
    assert permissions == {
        "UPDATE": False,
        "VIEW": True,
    }


@pytest.mark.asyncio
@requires_token
async def test_can_view_collab():
    user = User(token, allow_anonymous=False)
    can_view = await user.can_view_collab("model-validation")
    assert can_view


@pytest.mark.asyncio
@requires_token
async def test_can_edit_collab():
    user = User(token, allow_anonymous=False)
    can_edit = await user.can_edit_collab("model-validation")
    assert not can_edit
