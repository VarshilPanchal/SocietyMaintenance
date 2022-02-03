import { environment } from 'src/environments/environment';

export class CommonUtil {

    static createExternalURLForProject(projectTitle, projectId) {

        const host = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;

        const Url = `${protocol}//${host}:${port}/#/preview/project-external-detail?title=${projectTitle}&id=${projectId}`;
        return Url;
    }

    static createExternalURLForProfile(name, id, route) {

        const host = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;

        const Url = `${protocol}//${host}:${port}/#/preview/${route}?name=${name}&id=${id}`;
        return Url;
    }

    static createExternalURLForJob(jobTitle, jobId) {

        const host = window.location.hostname;
        const port = window.location.port;
        const protocol = window.location.protocol;

        const Url = `${protocol}//${host}:${port}/#/preview/job-external-detail?title=${jobTitle}&id=${jobId}`;
        return Url;
    }

    static openNewTab(url: string) {
        const customUrl = '#' + url;
        // url = '/preview/worker-profile-detail?user=03';
        // use like in respective components CommonUtil.openWindow("/preview/worker-profile-detail?user=03");
        window.open(customUrl, '_blank');
    }

    static openNewTabForExternalurl(url: string) {
        window.open(url, '_blank');
    }

    static getApiEndPointPath(): string {
        return environment.apiEndPoint;
    }

    static getBaseURL(): string {
        return environment.baseURL;
    }
}
