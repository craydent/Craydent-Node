interface HelperOptions {
    removeNewLineFromLogicalSyntax?: boolean;
    max?: number;
    offset?: number;
    newlineToHtml?: boolean;
    preserveNonMatching?: boolean;
}
interface BlockofCode {
    id: string;
    block: string;
    body: string;
    code: string;
}
interface TemplateTagConfig {
    IGNORE_CHARS: string[];
    FOR: {
        begin: RegExp;
        end: RegExp;
        helper: (code: string, body: string, options: HelperOptions) => string;
        parser: (code: string, oobj, bind, options: HelperOptions) => string;
    };
    FOREACH: {
        begin: RegExp;
        end: RegExp;
        helper: (code: string, body: string, rtnObject: any, uid: string, obj: BlockofCode, bind, ref_obj) => string;
        parser: (code: string, ref_obj: any, bind) => string;
    };
    WHILE: {
        begin: RegExp;
        end: RegExp;
        helper: (code: string, body: string) => string;
        parser: (code: string, ref_obj: any, bind) => string;
    };
    IF: {
        begin: RegExp;
        elseif: RegExp;
        else: RegExp;
        end: RegExp;
        helper: (code: string) => string;
        parser: (code: string, oobj, bind) => string;
    };
    SWITCH: {
        begin: RegExp;
        case: RegExp;
        default: RegExp;
        break: RegExp;
        end: RegExp;
        helper: (code: string) => string;
        parser: (code: string, oobj, bind) => string;
    };
    SCRIPT: {
        begin: RegExp;
        end: RegExp;
        parser: (code: string, obj, bind) => string;
    };
    TRY: {
        begin: RegExp;
        catch: RegExp;
        finally: RegExp;
        end: RegExp;
        helper: (code: string, lookups: { [key: string]: string }, exec) => string;
        parser: (code: string, oobj, bind) => string;
    };
    VARIABLE: RegExp;
    VARIABLE_NAME: RegExp | ((match: string) => string);
    DECLARE: {
        syntax: RegExp;
        parser: (htmlTemplate: string, declare: string) => string;
    }
}
interface Craydent {
    VERSION: string;
    DEBUG_MODE: boolean;
    ERROR_TYPES: any[]
    MODULES_LOADED: Object;
    CONSOLE_COLORS: Object;
    LOCAL_IP: string;
    PUBLIC_IP: string;
    // TEMPLATE_VARS: Array<TemplateVar>
    TEMPLATE_VARS: Array<any>;
    TEMPLATE_TAG_CONFIG: TemplateTagConfig;
    RESPONSES: {
        [key: number]: {
            status: number;
            success: boolean;
            message: string;
        }
    };
    // HTTP_STATUS_TEMPLATE: Array<HTTPStatusTemplate>
    HTTP_STATUS_TEMPLATE: { [key: number]: string };
    REST_API_TEMPLATE: string;
    ROUTE_API_PATH: string;
    ROUTE_LOGO_URL: string;
    EXPOSE_ROUTE_API: boolean;
    VERBOSE_LOGS: boolean;
    globalize: () => void;
    name: string;
}