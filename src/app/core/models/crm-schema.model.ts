export interface Field { key: string; label: string; type: string; required?: boolean; options?: string[]; }
export interface Tab { key: string; title: string; fields: Field[]; statuses: string[]; rows: any[]; }
export interface Module { title: string; tabs: Tab[]; }
