from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from urllib.parse import urlparse
import httpx

router = APIRouter()

ALLOWED_HOSTS = {"data-proxy.ebrains.eu"}


@router.get("/morphology")
async def proxy_morphology(url: str):
    """Proxy a morphology file URL, following redirects and adding CORS headers."""
    parsed = urlparse(url)
    if parsed.hostname not in ALLOWED_HOSTS:
        raise HTTPException(status_code=400, detail="URL host not permitted")

    # TODO: pass follow_redirects=True to AsyncClient() once httpx >= 0.20.0
    #       (earlier versions follow redirects by default)
    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch morphology file")

    filename = url.rstrip("/").split("/")[-1].split("?")[0]
    content = response.content

    if filename.lower().endswith(".asc"):
        text = content.decode("utf-8", errors="replace")
        if not text.startswith("; V3 text file"):
            text = "; V3 text file\n" + text
            content = text.encode("utf-8")

    return Response(
        content=content,
        media_type="application/octet-stream",
        headers={"Content-Disposition": f'inline; filename="{filename}"'},
    )
