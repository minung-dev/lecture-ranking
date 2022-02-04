# action.new-lecture

## 계획
- [x] api 호출 후 데이터를 이슈로 등록
- [x] api 호출 후 데이터를 json으로 저장 후 commit
- [ ] yarn, dist 캐싱
- [ ] 가장 최근 강좌 캐싱 및 최근 강좌 이후 강좌들만 이슈 및 json으로 등록하도록 하기
- [ ] gatsby, nextjs 등을 이용해서 json이나 이슈 이용해서 강좌들 목록 볼 수 있는 페이지 생성
- [ ] cron 돌 때마다 build도 새로하도록 해서 새 강좌 목록을 보는 페이지 완성


## 해보려고 한 것
- github action 사용
  - github issue 생성 및 commit, push
- file 또는 issue 기반 웹 페이지