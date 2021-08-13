package com.WSource.apiServer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Already Registered")
public class EmailInUseException extends Exception {
    public EmailInUseException() {}
}
