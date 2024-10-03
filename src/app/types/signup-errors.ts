interface SignUpErrorDetails {
    [key: string]: ValidationErrorDetails
}
  
interface ValidationErrorDetails {
    code: string;
    message: string;
}

export type { SignUpErrorDetails, ValidationErrorDetails }