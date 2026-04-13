"""Build a combined PDF (resume + self_intro) for Hyundai Vendis application."""
from pathlib import Path
import re
import subprocess
import sys

import markdown

HERE = Path(__file__).resolve().parent
RESUME_MD = HERE.parent / "_common" / "resume.md"
SELF_INTRO_MD = HERE / "self_intro.md"
OUT_HTML = HERE / "submission_bundle.html"
OUT_PDF = HERE / "submission_bundle.pdf"

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def load_resume() -> tuple[dict, str]:
    text = RESUME_MD.read_text(encoding="utf-8")
    lines = text.splitlines()
    cleaned, skip_until_h2 = [], True
    for line in lines:
        if skip_until_h2:
            if line.startswith("## "):
                skip_until_h2 = False
                cleaned.append(line)
            continue
        cleaned.append(line)
    text = "\n".join(cleaned)

    m = re.search(r"## 기본 정보\n(.*?)(?=\n## )", text, re.DOTALL)
    info_block = m.group(1).strip() if m else ""
    info_lines = [ln.strip().rstrip("  ") for ln in info_block.splitlines() if ln.strip()]
    basic = {
        "name": info_lines[0] if len(info_lines) > 0 else "",
        "title": info_lines[1] if len(info_lines) > 1 else "",
        "rest": info_lines[2:] if len(info_lines) > 2 else [],
    }

    body = re.sub(r"## 기본 정보\n.*?(?=\n## )", "", text, flags=re.DOTALL).strip()
    return basic, body


def load_self_intro() -> str:
    text = SELF_INTRO_MD.read_text(encoding="utf-8")
    # Drop the top H1 ("# Hyundai Vendis 지원 메모")
    text = re.sub(r"^# .*\n", "", text, count=1)
    # Drop section 5 "한 줄 추천 정리" and everything after
    text = re.split(r"\n##\s*5\.", text)[0]
    # Also drop the trailing "---" separator if present
    text = re.sub(r"\n-{3,}\s*$", "", text.rstrip()) + "\n"
    return text


CSS = """
@page { size: A4; margin: 18mm 16mm; }
body {
    font-family: "Malgun Gothic", "맑은 고딕", "Apple SD Gothic Neo", sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1f2328;
}
h1 { font-size: 20pt; margin: 0 0 6pt; border-bottom: 2px solid #1f2328; padding-bottom: 4pt; }
h2 { font-size: 13pt; margin: 14pt 0 6pt; border-bottom: 1px solid #d0d7de; padding-bottom: 2pt; }
h3 { font-size: 11pt; margin: 10pt 0 4pt; color: #1f2328; }
p { margin: 4pt 0; }
ul { margin: 4pt 0 4pt 18pt; padding: 0; }
li { margin: 2pt 0; }
strong { font-weight: 600; }
hr { border: 0; border-top: 1px solid #d0d7de; margin: 12pt 0; }
.page-break { page-break-before: always; }
.section-title { font-size: 16pt; margin: 0 0 10pt; }
a { color: #0969da; text-decoration: none; }
.header-table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 14pt;
}
.header-table td { vertical-align: middle; padding: 0; }
.header-table .photo-cell { width: 3.5cm; padding-right: 12pt; }
.header-table .photo-cell img { width: 3.5cm; height: 4.5cm; object-fit: cover; display: block; }
.header-table .info-cell .name { font-size: 20pt; font-weight: 700; }
.header-table .info-cell .title { font-size: 11pt; color: #57606a; margin-top: 2pt; }
.header-table .info-cell .contact { font-size: 10pt; margin-top: 4pt; }
"""


def md_to_html(md_text: str) -> str:
    return markdown.markdown(md_text, extensions=["extra", "sane_lists"])


def build_html() -> str:
    basic, resume_body = load_resume()
    resume_html = md_to_html(resume_body)
    intro_html = md_to_html(load_self_intro())

    contact_html = md_to_html(" · ".join(basic.get("rest", []))).replace("<p>", "").replace("</p>", "")

    header_html = f"""
<table class=\"header-table\"><tr>
  <td class=\"photo-cell\"><img src=\"photo_resume.jpg\" alt=\"사진\"></td>
  <td class=\"info-cell\">
    <div class=\"name\">{basic['name']}</div>
    <div class=\"title\">{basic['title']}</div>
    <div class=\"contact\">{contact_html}</div>
  </td>
</tr></table>
"""
    return f"""<!doctype html>
<html lang=\"ko\">
<head>
<meta charset=\"utf-8\">
<title>장시영 - 현대벤디스 지원서</title>
<style>{CSS}</style>
</head>
<body>
<h1 class=\"section-title\">이력서</h1>
{header_html}
{resume_html}
<div class=\"page-break\"></div>
<h1 class=\"section-title\">자기소개서 - 현대벤디스</h1>
{intro_html}
</body>
</html>
"""


def main() -> int:
    OUT_HTML.write_text(build_html(), encoding="utf-8")
    print(f"[built] {OUT_HTML}")

    if not Path(CHROME).exists():
        print(f"[error] Chrome not found at {CHROME}", file=sys.stderr)
        return 1

    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={OUT_PDF}",
        OUT_HTML.as_uri(),
    ]
    print("[running]", " ".join(cmd))
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stdout)
        print(result.stderr, file=sys.stderr)
        return result.returncode
    print(f"[done] {OUT_PDF}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
