export const UserRole = {
    NO_ROLE_ASSIGNED: 'No Role Assigned',
    LEGAL_EXPERT: 'Legal Expert',
    EDITOR: 'Editor',
    MANAGER: 'Manager',
    CITIZEN: 'Citizen',
};

export const roles = Object.values(UserRole);

export const UserRoleIntToStringMapping = {
    null: 'No Role Assigned',
    1: 'Legal Expert',
    2: 'Editor',
    3: 'Manager',
    4: 'Citizen',
};

export const UserRoleStringToIntMapping = {
    'No Role Assigned': 4, // default
    'Legal Expert': 1,
    'Editor': 2,
    'Manager': 3,
    'Citizen': 4,
};

export const SummaryStatus = {
    NEW: 'New',
    REVISED: 'Revised',
    PENDING_APPROVAL: 'Pending Approval',
    PUBLISHED: 'Published',
};

export const SummaryStatuses = Object.values(SummaryStatus);