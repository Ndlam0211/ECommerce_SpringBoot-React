package com.nguyendinhlam.demo5.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class APIReponse {
    private String mesage;
    private boolean status;
}