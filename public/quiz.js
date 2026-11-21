"use strict";

const questions = {
  "쉬움": [
    ["감염병 예방을 위한 올바른 손 씻기 방법은?", ["비누로 손바닥과 손등 등을 꼼꼼히 씻는다", "물에 손끝만 잠깐 적신다", "수건으로 손을 닦기만 한다", "손 씻기 대신 손을 턴다"], 0],
    ["기침할 때 주변 사람을 보호하는 방법은?", ["옷소매로 입과 코를 가린다", "손을 씻지 않고 친구의 물건을 만진다", "다른 사람을 향해 기침한다", "기침 후 바로 손으로 음식을 나눈다"], 0],
    ["병원체가 몸에 들어와 증식을 일으켜 생기는 병을 무엇이라 하는가?", ["감염병", "골절", "근육통", "화상"], 0],
    ["손을 씻어야 하는 때로 가장 적절한 것은?", ["화장실을 다녀온 후", "책을 읽기 직전만", "잠자는 동안", "운동화를 신기 전만"], 0],
    ["감염병 예방에 도움이 되는 생활 습관은?", ["개인 물병을 사용한다", "사용한 휴지를 책상에 둔다", "손을 씻지 않고 음식을 먹는다", "기침을 손으로 막고 바로 물건을 만진다"], 0]
  ],
  "보통": [
    ["예방접종의 주된 목적은?", ["특정 감염병에 대한 면역 형성을 돕는다", "모든 병을 즉시 치료한다", "손 씻기를 대신한다", "항생제를 만들어 낸다"], 0],
    ["감염병의 전파 경로를 차단하는 행동은?", ["자주 만지는 물건을 적절히 닦는다", "기침한 손으로 문손잡이를 잡는다", "아픈 친구와 물병을 공유한다", "사용한 휴지를 방치한다"], 0],
    ["항생제에 대한 설명으로 옳은 것은?", ["일부 세균 감염을 치료하는 데 사용한다", "모든 바이러스 감염을 치료한다", "예방접종을 대신한다", "처방받지 않은 약을 나누어 먹어도 된다"], 0],
    ["호흡기 감염병 예방에 도움이 되는 행동은?", ["실내 공기를 자주 환기한다", "아플 때 물병을 공유한다", "기침 예절을 지키지 않는다", "손 씻기 없이 음식을 나눈다"], 0],
    ["기침이나 재채기 뒤 손에 묻은 병원체의 전파를 줄이는 방법은?", ["비누와 물로 손을 씻는다", "바로 공용 물건을 만진다", "손을 옷에만 문지른다", "친구의 수건으로 손을 닦는다"], 0]
  ],
  "어려움": [
    ["한 학생이 아픈 뒤 같은 모둠에서 감염병이 퍼졌다. 전파 경로를 조사할 때 가장 적절한 질문은?", ["함께 사용한 물건이나 접촉 상황은 무엇이었을까?", "누가 가장 키가 클까?", "모둠의 이름은 무엇일까?", "누가 가장 먼저 등교했을까?"], 0],
    ["예방접종을 할 수 없는 사람도 간접적으로 보호받을 가능성이 커지는 이유는?", ["주변의 면역 형성으로 감염병 확산이 줄어들 수 있어서", "모든 병원체가 즉시 사라져서", "예방접종이 모든 질병을 치료해서", "손 씻기가 더 이상 필요 없어서"], 0],
    ["교실에서 호흡기 감염병 예방 계획을 세울 때 가장 타당한 조합은?", ["환기, 손 씻기, 기침 예절", "창문 닫기, 물병 공유, 손 씻기 생략", "환기만 하고 기침 예절 생략", "물병 공유와 수건 공동 사용"], 0],
    ["항생제 오남용을 줄이기 위한 행동으로 옳은 것은?", ["의료인의 안내에 따라 필요한 경우에만 복용한다", "감기마다 남은 항생제를 임의로 먹는다", "친구에게 처방약을 나누어 준다", "증상이 비슷하면 다른 사람의 약을 먹는다"], 0],
    ["모둠이 감염병 예방 포스터를 만들 때 근거 확인 방법으로 가장 적절한 것은?", ["공신력 있는 보건기관의 최신 자료와 대조한다", "출처 없는 한 문장을 그대로 믿는다", "자극적인 제목만 보고 결론 낸다", "확인되지 않은 소문을 사실로 쓴다"], 0]
  ]
};

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

document.getElementById("quiz-form").addEventListener("change", () => {
  document.getElementById("result").replaceChildren(
    element("h2", "생성 결과"),
    element("p", "조건이 변경되었습니다. 문항 만들기 버튼을 눌러 주세요.")
  );
});

document.getElementById("quiz-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const subject = document.getElementById("subject").value;
  const unit = document.getElementById("unit").value;
  const difficulty = document.getElementById("difficulty").value;
  const result = document.getElementById("result");
  result.replaceChildren(element("h2", "생성 결과"));

  if (subject !== "보건" || unit !== "감염병 예방" || !Object.hasOwn(questions, difficulty) || questions[difficulty].length < 5) {
    result.append(element("p", "해당 조건의 문항이 5개 이상 없습니다. 지원되는 조건을 선택해 주세요.", "error"));
    return;
  }

  result.append(element("p", `${subject} · ${unit} · ${difficulty} · 5문항`));
  shuffled(questions[difficulty]).slice(0, 5).forEach(([question, choices, answer], index) => {
    const card = element("article", undefined, "card");
    const ordered = shuffled(choices.map((text, originalIndex) => ({ text, originalIndex })));
    const list = element("ol");
    ordered.forEach((choice) => list.append(element("li", choice.text)));
    card.append(element("h3", `${index + 1}. ${question}`), list);
    card.append(element("p", `정답: ${ordered.findIndex((choice) => choice.originalIndex === answer) + 1}번`));
    result.append(card);
  });
});
