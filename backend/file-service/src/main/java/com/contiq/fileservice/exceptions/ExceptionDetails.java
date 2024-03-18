package com.contiq.fileservice.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@NoArgsConstructor
@Data
public class ExceptionDetails {
    private Date timeStamp;
    private String msg;
    private HttpStatus status;

    public ExceptionDetails(Date timeStamp, String message, HttpStatus status) {
        this.msg=message;
        this.status=status;
        this.timeStamp=timeStamp;
    }
}
