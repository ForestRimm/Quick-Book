package com.project.QR.exception;

import lombok.Getter;

public enum ExceptionCode {
  MEMBER_NOT_FOUND(404, "MEMBER NOT FOUND"),
  MEMBER_ALREADY_EXISTS(409, "MEMBER ALREADY EXISTS"),
  MEMBER_IS_SLEEP(404, "Member is sleep"),
  MEMBER_IS_QUIT(404, "Member is quit"),
  FIELD_ERROR(400, "FIELD ERROR"),
  CONSTRAINT_VIOLATION_ERROR(400, "CONSTRAINT VIOLATION ERROR"),
  NOT_IMPLEMENTATION(501, "Not Implementation"),
  INVALID_MEMBER_STATUS(400, "INVALID MEMBER STATUS"),
  MEMBER_INFO_INCORRECT(404, "LOGIN INFO IS INCORRECT"),
  AUTHENTICATION_NOT_FOUND(403, "AUTHENTICATION NOT FOUND"),
  QUESTION_NOT_FOUND(404, "QUESTION IS NOT FOUND"),
  SORT_OPTION_IS_INVALID(404, "SORT OPTION IS INVALID"),
  ANSWER_NOT_FOUND(404, "ANSWER IS NOT FOUND"),
  UNAUTHORIZED(403, "UNAUTHORIZED"),
  QUESTION_VOTE_NOT_FOUND(404, "QUESTION VOTE IS NOT FOUND"),
  ANSWER_VOTE_NOT_FOUND(404, "ANSWER VOTE IS NOT FOUND"),
  ALREADY_VOTE(403, "ALREADY VOTE"),
  FILE_UPLOAD_FAIL(500, "FILE_UPLOAD_FAIL"),
  FOLDER_MAKE_FAIL(500, "FOLDER_MAKE_FAIL"),
  QUESTION_COMMENT_NOT_FOUND(404, "QUESTION COMMENT IS NOT FOUND"),
  ANSWER_COMMENT_NOT_FOUND(404, "ANSWER COMMENT IS NOT FOUND" ),
  TAG_NOT_FOUND(404, "TAG IS NOT FOUND"),
  TOKEN_IS_INVALID(401, "TOKEN IS INVALID"),
  REFRESH_TOKEN_IS_EXPIRED(403, "REFRESH TOKEN IS EXPIRED"),
  VALIDATION_CODE_INCORRECT(404, "VALIDATION CODE IS INCORRECT"),
  EMAIL_VALIDATION_NEED(403, "EMAIL VALIDATION IS NEED"),
  SECTOR_NOT_FOUND(404, "SECTOR IS NOT FOUND"),
  ROLE_IS_NOT_EXISTS(403, "Role is not exists"),
  QR_CODE_NOT_FOUND(404, "QR CODE IS NOT FOUND"),
  RESERVATION_ALREADY_EXISTS(409, "RESERVATION IS ALREADY EXISTS"),
  OPTION_IS_INVALID(404, "OPTION IS INVALID"),
  RESERVATION_NOT_FOUND(404, "RESERVATION IS NOT FOUND"),
  INVALID_INFO(403, "INVALID INFO");

  @Getter
  private int status;

  @Getter
  private String message;

  ExceptionCode(int code, String message) {
    this.status = code;
    this.message = message;
  }
}
