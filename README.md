# Entrofy Systems — 회사 홈페이지

www.entrofy.com 에 게시되는 정적 사이트입니다. 서버·DB 없이 HTML/CSS/JS 파일만으로 동작합니다.

## 파일 구성
- `index.html` — 랜딩 페이지 (영어)
- `notices/index.html` — 전자공고 목록
- `notices/template.html` — 공고 1건 템플릿 (복사해서 사용, 목록에는 링크하지 않음)
- `notices/files/` — 공고 첨부 PDF 보관 폴더
- `assets/style.css`, `assets/site.js` — 스타일과 스크립트
- `CNAME` — 커스텀 도메인 (www.entrofy.com). 삭제하면 도메인 연결이 풀림
- `.nojekyll` — GitHub Pages가 파일을 가공하지 않도록 하는 표식

## 수정 방법
GitHub 웹에서 파일을 열고 연필 아이콘 → 수정 → Commit changes. 약 1분 뒤 사이트에 반영됩니다.

## 전자공고 추가 절차
1. `notices/template.html` 을 복사해 `notices/2026-001.html` 로 저장하고 【 】를 채움
2. 첨부 PDF가 있으면 `notices/files/2026-001.pdf` 로 업로드
3. `notices/index.html` 의 `<tbody>` 맨 위에 새 행 추가 (주석 안 예시 참고)
4. Commit → 사이트에서 확인 → 게시 시작일 화면 캡처(전체 페이지, 날짜 포함) 보관
5. 게시 종료일에 목록의 상태를 `status-closed` 로 바꾸고 종료일 화면 캡처 보관
6. 공고 파일은 삭제하지 않음 (상시 열람)

## 설립 후 갱신할 곳
- `index.html` 회사 섹션: 법인등록번호·사업자등록번호
- 연락처 이메일: cukim@unist.ac.kr → cukim@entrofy.com (index.html 2곳)
