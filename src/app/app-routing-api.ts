import { environment } from "src/environments/environment";
const API = environment.apiUrl;

export class AppRoutingApi {
    static Auth = class {
        static Login: string = API + "customers/login";
        static LoginAdmin: string = API + "auths";
    };

    static Article = class {
        static Router_Prefix: string = API + "Articles";
    };

    static Attribute = class {
        static Router_Prefix: string = API + "Attributes";
    };

    static Customer = class {
        static Router_Prefix: string = API + "Customers";
    };

    static Report = class {
        static Router_Prefix: string = API + "Reports";
    };

    static Review = class {
        static Router_Prefix: string = API + "Reviews";
    };

    static EmailConfiguration = class {
        static Router_Prefix: string = API + "EmailConfigurations";
    };

    static EmailRegistration = class {
        static Router_Prefix: string = API + "EmailRegistrations";
    };

    static EmailTemplate = class {
        static Router_Prefix: string = API + "EmailTemplates";
    };

    static Gallery = class {
        static Router_Prefix: string = API + "Galleries";
    };

    static Menu = class {
        static Router_Prefix: string = API + "Menus";
    };

    static Order = class {
        static Router_Prefix: string = API + "Orders";
    };

    static Product = class {
        static Router_Prefix: string = API + "Products";
    };

    static User = class {
        static Router_Prefix: string = API + "Users";
    };

    static Website = class {
        static Router_Prefix: string = API + "Websites";
    };
}