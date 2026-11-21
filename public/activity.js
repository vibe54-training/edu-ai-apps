"use strict";

const activities = {
  "손 씻기": [
    { title: "손 씻기 순서 카드 맞추기", materials: "손 씻기 단계 카드, 모둠 기록지, 필기구", minutes: 15, steps: ["모둠별로 섞인 손 씻기 단계 카드를 올바른 순서로 배열한다.", "각 단계가 필요한 이유를 이야기하고 기록한다.", "공신력 있는 손 씻기 안내 자료와 비교하며 수정한다."] },
    { title: "손 씻기 안내 포스터", materials: "도화지, 색연필, 손 씻기 안내 자료", minutes: 20, steps: ["손을 씻어야 하는 상황과 방법을 모둠에서 정리한다.", "중요한 단계가 드러나도록 안내 포스터를 만든다.", "다른 모둠과 포스터를 교환해 빠진 내용이 없는지 살핀다."] },
    { title: "손 씻기 점검 역할극", materials: "역할 카드, 손 씻기 점검표, 필기구", minutes: 15, steps: ["손 씻기가 필요한 상황 카드를 고르고 역할을 나눈다.", "손 씻기 과정을 말과 동작으로 표현한다.", "점검표를 이용해 서로의 과정을 확인하고 보완한다."] }
  ],
  "전파 경로": [
    { title: "감염 경로 연결 지도", materials: "상황 카드, 전지, 색 펜", minutes: 20, steps: ["모둠별로 감염병 전파 상황 카드를 읽는다.", "사람과 물건 사이의 가능한 전파 경로를 화살표로 나타낸다.", "경로를 끊을 수 있는 예방 행동을 표시하고 발표한다."] },
    { title: "예방 행동 분류하기", materials: "예방 행동 카드, 분류판, 필기구", minutes: 15, steps: ["행동 카드를 접촉 및 호흡기 전파 예방과 관련지어 분류한다.", "각 행동이 어떻게 전파를 줄이는지 토론한다.", "모둠별 분류 결과를 비교하고 필요한 내용을 수정한다."] },
    { title: "건강한 교실 약속", materials: "활동지, 포스트잇, 필기구", minutes: 20, steps: ["교실에서 감염병이 전파될 수 있는 상황을 찾는다.", "각 상황에 맞는 예방 행동을 포스트잇에 적는다.", "실천 가능한 교실 약속을 정하고 이유를 발표한다."] }
  ]
};

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

document.getElementById("activity-form").addEventListener("change", () => {
  document.getElementById("result").replaceChildren(
    element("h2", "추천 결과"),
    element("p", "조건이 변경되었습니다. 활동 추천 버튼을 눌러 주세요.")
  );
});

document.getElementById("activity-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const unit = document.getElementById("unit").value;
  const goal = document.getElementById("goal").value;
  const result = document.getElementById("result");
  result.replaceChildren(element("h2", "추천 결과"));

  if (unit !== "감염병 예방" || !Object.hasOwn(activities, goal) || activities[goal].length < 3) {
    result.append(element("p", "해당 조건의 활동이 3개 이상 없습니다. 지원되는 조건을 선택해 주세요.", "error"));
    return;
  }

  result.append(element("p", `${unit} · ${document.getElementById("goal").selectedOptions[0].textContent} · 3개 활동`));
  shuffled(activities[goal]).slice(0, 3).forEach((activity) => {
    const card = element("article", undefined, "card");
    const steps = element("ol");
    activity.steps.forEach((step) => steps.append(element("li", step)));
    card.append(
      element("h3", activity.title),
      element("p", `준비물: ${activity.materials}`),
      element("p", `소요 시간: ${activity.minutes}분`),
      element("h4", "진행 방법"),
      steps
    );
    result.append(card);
  });
});
