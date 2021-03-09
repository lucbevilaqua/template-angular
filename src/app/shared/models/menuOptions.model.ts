import Permissions from '../enums/permissions.enum';

class MenuOptions {
   permissions?: Permissions[];
   blockedRequestWhenStarted?: boolean;
   count?: any;
}

export default MenuOptions;
