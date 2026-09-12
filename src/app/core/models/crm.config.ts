import { Module } from './crm-schema.model';
export { Field, Tab, Module } from './crm-schema.model';
import { SalesConfig } from '../../features/sales/sales.config';
import { CustomersConfig } from '../../features/customers/customers.config';
import { ProjectsConfig } from '../../features/projects/projects.config';
import { DigitalMarketingConfig } from '../../features/digital-marketing/digital-marketing.config';
import { HrConfig } from '../../features/hr/hr.config';
import { AccountsConfig } from '../../features/accounts/accounts.config';
import { SupportRenewalsConfig } from '../../features/support-renewals/support-renewals.config';
import { SettingsConfig } from '../../features/settings/settings.config';
export const MODULES: Record<string, Module> = {
  'sales': SalesConfig,
  'customers': CustomersConfig,
  'projects': ProjectsConfig,
  'digital-marketing': DigitalMarketingConfig,
  'hr': HrConfig,
  'accounts': AccountsConfig,
  'support-renewals': SupportRenewalsConfig,
  'settings': SettingsConfig,
};
