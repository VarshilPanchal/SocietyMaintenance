import { Injectable } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

export enum Codesss {
  COUNTINUE = 100,
  SWITCHING_PROTOCOL = 101
}

export enum RedirectionCodes {
  MULTIPLE_CHOICE = 300,
  MOVED_PERMANANTLY = 301,
  MOVED_TEMPORARY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
}

export enum ServerErrorCodes {

  SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  OUT_OF_RESOURCES = 503,
  GATEWAY_TIME_OUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export enum ClientErrorCodes {
  SERVER_SHUTDOWN = 0,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIME_OUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_ENTITY_TOO_LARGE = 413,
  REQUEST_URL_TOO_LARGE = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
}

export enum SuccessCodes {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  PARTIAL_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private notification: NotificationService) { }

  whichError(errorCode: any, errorMessage: any) {
    errorCode = parseInt(errorCode);
    switch (errorCode) {
      case ClientErrorCodes.BAD_REQUEST:
        this.notification.error(errorMessage, 'BAD_REQUEST');
        break;
      case ClientErrorCodes.UNAUTHORIZED:
        this.notification.error(errorMessage, 'UNAUTHORIZED');
        break;
      case ClientErrorCodes.PAYMENT_REQUIRED:
        this.notification.error(errorMessage, 'PAYMENT_REQUIRED');
        break;
      case ClientErrorCodes.FORBIDDEN:
        this.notification.error(errorMessage, 'FORBIDDEN');
        break;
      case ClientErrorCodes.NOT_FOUND:
        this.notification.error(errorMessage, 'NOT_FOUND');
        break;
      case ClientErrorCodes.METHOD_NOT_ALLOWED:
        this.notification.error(errorMessage, 'METHOD_NOT_ALLOWED');
        break;
      case ClientErrorCodes.NOT_ACCEPTABLE:
        this.notification.error(errorMessage, 'NOT_ACCEPTABLE');
        break;
      case ClientErrorCodes.PROXY_AUTHENTICATION_REQUIRED:
        this.notification.error(errorMessage, 'PROXY_AUTHENTICATION_REQUIRED');
        break;
      case ClientErrorCodes.REQUEST_TIME_OUT:
        this.notification.error(errorMessage, 'REQUEST_TIME_OUT');
        break;
      case ClientErrorCodes.CONFLICT:
        this.notification.error(errorMessage, 'CONFLICT');
        break;
      case ClientErrorCodes.GONE:
        this.notification.error(errorMessage, 'GONE');
        break;
      case ClientErrorCodes.LENGTH_REQUIRED:
        this.notification.error(errorMessage, 'LENGTH_REQUIRED');
        break;
      case ClientErrorCodes.PRECONDITION_FAILED:
        this.notification.error(errorMessage, 'PRECONDITION_FAILED');
        break;
      case ClientErrorCodes.REQUEST_ENTITY_TOO_LARGE:
        this.notification.error(errorMessage, 'REQUEST_ENTITY_TOO_LARGE');
        break;
      case ClientErrorCodes.REQUEST_URL_TOO_LARGE:
        this.notification.error(errorMessage, 'REQUEST_URL_TOO_LARGE');
        break;
      case ClientErrorCodes.UNSUPPORTED_MEDIA_TYPE:
        this.notification.error(errorMessage, 'UNSUPPORTED_MEDIA_TYPE');
        break;

      default:
        this.notification.error(errorMessage, 'SERVER_SHUTDOWN');
        break;
    }
  }

  userNotification(notificationCode: any, notificationMessage: any) {
    notificationCode = parseInt(notificationCode);
    switch (notificationCode) {
      case SuccessCodes.OK:
        this.notification.success(notificationMessage, 'Ok');
        break;
      case SuccessCodes.CREATED:
        this.notification.success(notificationMessage, 'CREATED');
        break;
      case SuccessCodes.ACCEPTED:
        this.notification.success(notificationMessage, 'ACCEPTED');
        break;
      case SuccessCodes.PARTIAL_INFORMATION:
        this.notification.success(notificationMessage, 'PARTIAL_INFORMATION');
        break;
      case SuccessCodes.NO_CONTENT:
        this.notification.success(notificationMessage, 'NO_CONTENT');
        break;
      case SuccessCodes.RESET_CONTENT:
        this.notification.success(notificationMessage, 'RESET_CONTENT');
        break;
      case SuccessCodes.PARTIAL_CONTENT:
        this.notification.success(notificationMessage, 'PARTIAL_CONTENT');
        break;

      default:
        this.whichError(notificationCode, notificationMessage);
        break;
    }
  }

  userInformationNotification(notificationCode: any, notificationMessage: any) {
    notificationCode = parseInt(notificationCode);
    switch (notificationCode) {
      case RedirectionCodes.MOVED_PERMANANTLY:
        this.notification.info('information notificationMessage', 'Moved Permanantly');
        break;
      default:
        alert('Unknown Success code');
        break;
    }
  }

}
