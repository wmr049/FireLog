/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService } from '../../services/auth.service';
export declare class NbLogoutComponent implements OnInit {
    protected service: NbAuthService;
    protected router: Router;
    redirectDelay: number;
    constructor(service: NbAuthService, router: Router);
    ngOnInit(): void;
    logout(provider: string): void;
}
