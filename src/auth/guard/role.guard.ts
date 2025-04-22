import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../enum/role.enum";
import { ROLE_KEY } from "../decorator/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRoles) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return matchRoles(requiredRoles, user?.role)
    }
}
 function matchRoles(requiredRoles:string[], userRole:string[]) {
        return requiredRoles.some((role: string) => userRole?.includes(role))    
 }