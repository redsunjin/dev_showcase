# 개발자 핵심 기본소양 152선 웹앱

웹 보안, 데이터베이스, 자료구조, SQL 함정, OS·네트워크, 설계·클린코드, 브라우저·FE, 소프트웨어 테스트, CI/CD·DevOps, AI·LLM·에이전트까지 **10개 분야 152개 핵심 기본기**를 도식·난이도(`Lv.1`~`Lv.3`)·암기 모드·집중 퀴즈로 학습할 수 있는 오픈소스 PWA 웹앱입니다.

- **라이브 웹앱**: https://redsunjin.github.io/dev_showcase/
- **라이선스**: [MIT License](LICENSE)

## 주요 기능
- **난이도·우선순위 학습**: `Lv.1 입문·필수` → `Lv.2 실무·핵심` → `Lv.3 심화·고급` 필터 및 우선순위 정렬
- **암기 모드 & 집중 퀴즈**: 3초 개발지식 자가 점검 및 랜덤/미학습 퀴즈 덱
- **진도 및 북마크 자동 저장**: 브라우저 `localStorage` 기반 영구 저장 및 PWA 오프라인 지원
- **AI 학습 프롬프트 복사**: 카드별 실무 심화 / 1:1 튜터 프롬프트 원클릭 복사

## 카드 제작 하네스 (Harness)
신규 카드 추가 및 검증 규칙은 [harness/CARD_AUTHORING_GUIDE.md](harness/CARD_AUTHORING_GUIDE.md)를 따릅니다.

```bash
node harness/validate.mjs
node harness/functional-test.mjs
```

## License
Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.
