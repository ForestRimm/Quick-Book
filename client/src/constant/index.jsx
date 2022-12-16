export const inputs = [
  {
    id: "email",
    name: "이메일",
    type: "email",
    placeholder: "write your email",
    errorMessage: "이메일 형식을 확인해주세요.",
    required: true,
  },
  {
    id: "password",
    name: "비밀번호",
    type: "password",
    placeholder: "write your password",
    errorMessage: "비밀번호는 8글자 이상이여야 합니다.",
    pattern: ".{8,}",
    required: true,
  },
  {
    id: "confirmPassword",
    name: "비밀번호 확인",
    type: "password",
    placeholder: "confirm password",
    errorMessage: "비밀번호는 8글자 이상이여야 합니다.",
    pattern: ".{8,}",
    required: true,
  },
  {
    id: "ownerName",
    name: "대표 성명",
    type: "text",
    placeholder: "대표 성명",
    errorMessage: "비밀번호는 8글자 이상이여야 합니다.",
    pattern: ".{8,}",
    required: true,
  },
  {
    id: "phone",
    name: "전화번호",
    type: "number",
    placeholder: "type phone number",
    errorMessage: "비밀번호는 8글자 이상이여야 합니다.",
    pattern: ".{8,}",
    required: true,
  },
];
