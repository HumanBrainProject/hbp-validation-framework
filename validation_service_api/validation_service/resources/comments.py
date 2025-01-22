"""

"""

from datetime import datetime, timezone
from uuid import UUID
from typing import List
import logging

import fairgraph.openminds.core as omcore
from fairgraph.errors import AuthenticationError

from fastapi import APIRouter, Depends, Query, Path, HTTPException, status as status_codes
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from ..auth import User, get_kg_client_for_user_account, get_kg_client_for_service_account
from ..data_models import Comment, CommentPatch, NewComment, PublicationStatus

logger = logging.getLogger("validation_service_api")

auth = HTTPBearer(auto_error=False)
router = APIRouter()


@router.get("/comments/", response_model=List[Comment])
async def query_comments(
    about: UUID = Query(
        None, description="UUID of the object that the comment is about"
    ),
    commenter_orcid: str = Query(
        None,
        description='<a href="https://orcid.org">ORCID</a> of the person who made the comment',
    ),
    commenter_family_name: str = Query(
        None, description="Family name of the person who made the comment"
    ),
    status: PublicationStatus = Query(
        None, description="Is the comment a draft, submitted, or published"
    ),
    size: int = Query(20, description="Maximum number of responses"),
    from_index: int = Query(0, description="Index of the first response returned"),
    # from header
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token)
    filters = {}
    if about:
        filters["about"] = str(about)
    if commenter_orcid:
        filters["commenter__digital_identifiers__identifier"] = commenter_orcid
    elif commenter_family_name:
        filters["commenter__family_name"] = commenter_family_name
    try:
        kg_comments = omcore.Comment.list(
            kg_user_client,
            scope="any",
            follow_links={"commenter": {}},
            size=size,
            from_index=from_index,
            **filters
        )
    except AuthenticationError as err:
        raise HTTPException(
            status_code=status_codes.HTTP_401_UNAUTHORIZED,
            detail="Token not provided, or is invalid, it may have expired."
        )
    comments = [Comment.from_kg_object(obj, kg_user_client) for obj in kg_comments]
    if status:
        comments = [c for c in comments if c.status == status]
    return comments


@router.post("/comments/", response_model=Comment, status_code=status_codes.HTTP_201_CREATED)
async def create_comment(
    comment: NewComment,
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    kg_user_client = get_kg_client_for_user_account(token)
    user = User(token, allow_anonymous=False)
    commenter = await user.get_person(kg_user_client)
    if commenter is None:
        raise HTTPException(
            status_code=status_codes.HTTP_404_NOT_FOUND,
            detail="This user cannot comment at the moment. Please contact EBRAINS support."
        )
    obj = comment.to_kg_object(kg_user_client, commenter)
    obj.save(kg_user_client, space="myspace", recursive=False)
    return Comment.from_kg_object(obj, kg_user_client)


@router.get("/comments/{comment_id}", response_model=Comment)
async def get_comment(
    comment_id: UUID = Path(
        ..., title="Comment ID", description="ID of the comment to be retrieved"
    ),
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    """Retrieve a specific comment identified by a UUID"""
    kg_user_client = get_kg_client_for_user_account(token)
    obj = omcore.Comment.from_uuid(str(comment_id), kg_user_client, scope="any")
    if obj:
        return Comment.from_kg_object(obj, kg_user_client)
    else:
        raise HTTPException(
            status_code=status_codes.HTTP_404_NOT_FOUND,
            detail=(
                f"Either the comment with identifier {comment_id}"
                " does not exist or you do not have access to it."
            ),
        )


@router.put("/comments/{comment_id}", response_model=Comment)
async def update_comment(
    comment_patch: CommentPatch,
    comment_id: UUID = Path(
        ..., title="Comment ID", description="ID of the comment to be updated"
    ),
    token: HTTPAuthorizationCredentials = Depends(auth),
):
    """Retrieve a specific comment identified by a UUID"""
    kg_user_client = get_kg_client_for_user_account(token)
    original_comment = omcore.Comment.from_uuid(
        str(comment_id), kg_user_client, scope="any"

    )

    if original_comment.is_released(kg_user_client):
        raise HTTPException(
            status_code=status_codes.HTTP_403_FORBIDDEN,
            detail=f"Published comments cannot be modified",
        )
    if comment_patch.content:
        if omcore.Person.me(kg_user_client).id != original_comment.commenter.id:
            raise HTTPException(
                status_code=status_codes.HTTP_403_FORBIDDEN,
                detail=f"Comments can only be modified by their author",
            )
        original_comment.comment = comment_patch.content
        original_comment.timestamp = datetime.now(timezone.utc)

    original_comment.save(kg_user_client, recursive=False)

    if comment_patch.status is not None:

        if comment_patch.status == PublicationStatus.draft:
            target_space = "myspace"
        else:
            about = original_comment.about.resolve(kg_user_client, scope="any")
            target_space = about.space

        if original_comment.space != target_space:
            try:
                # try to move to appropriate space with user client
                kg_user_client.move_to_space(original_comment.id, target_space)
            except Exception as err:
                # move with service client
                kg_service_client =  get_kg_client_for_service_account()
                try:
                    kg_service_client.move_to_space(original_comment.id, target_space)
                except Exception as err2:
                    logger.error(str(err2))
                    raise HTTPException(
                        status_code=status_codes.HTTP_403_FORBIDDEN,
                        detail=f"You do not have sufficient permissions to publish this comment",
                    )
            else:
                original_comment._space = target_space

        if comment_patch.status == PublicationStatus.published:
            # release
            kg_service_client =  get_kg_client_for_service_account()
            try:
                original_comment.release(kg_service_client)
            except Exception as err:
                logger.error(str(err))
                raise HTTPException(
                    status_code=status_codes.HTTP_403_FORBIDDEN,
                    detail=f"You do not have sufficient permissions to publish this comment",
                )

    return Comment.from_kg_object(original_comment, kg_user_client)
