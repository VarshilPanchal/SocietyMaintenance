import { CommonUtil } from '../services/util/CommonUtil';


export const API_CONSTANTS = {

    // Sample file path
    SAMPLE_FILE_PATH: 'assets/sample file/',

    // Test
    TEST_API_GET: CommonUtil.getApiEndPointPath() + 'test/testGet',
    TEST_API_POST: CommonUtil.getApiEndPointPath() + 'test/testPost',
    TOKEN_API: CommonUtil.getApiEndPointPath() + 'oauth/token',

    // Content
    CONTENT_SAVE: CommonUtil.getApiEndPointPath() + 'content',
    GET_CONTENT_BY_TYPE: CommonUtil.getApiEndPointPath() + 'content/contentType?type=',
    CONTENT_UPDATE: CommonUtil.getApiEndPointPath() + 'content',

    // Sample
    SAMPLE_GET: CommonUtil.getApiEndPointPath() + 'test/testGet',
    SAMPLE_POST: CommonUtil.getApiEndPointPath() + 'test/testPost',

};

