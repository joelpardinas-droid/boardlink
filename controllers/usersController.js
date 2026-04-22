// controllers/usersController.js — User and Access Management Module Logic

// Sample users with RBAC roles
const users = [
    { id: 1, name: 'Dr. Maria Reyes',       username: 'mreyes',    role: 'Board Secretary', status: 'Active',   lastLogin: 'March 12, 2026' },
    { id: 2, name: 'Atty. Ramon Santos',    username: 'rsantos',   role: 'Trustee',         status: 'Active',   lastLogin: 'March 11, 2026' },
    { id: 3, name: 'Engr. Luis Cruz',       username: 'lcruz',     role: 'Trustee',         status: 'Active',   lastLogin: 'March 10, 2026' },
    { id: 4, name: 'Dr. Ana Bautista',      username: 'abautista', role: 'Council Member',  status: 'Active',   lastLogin: 'March 9, 2026'  },
    { id: 5, name: 'Ms. Jenny Garcia',      username: 'jgarcia',   role: 'Staff',           status: 'Active',   lastLogin: 'March 12, 2026' },
    { id: 6, name: 'Mr. Pedro Dela Rosa',   username: 'pdelarosa', role: 'Trustee',         status: 'Active',   lastLogin: 'March 8, 2026'  },
    { id: 7, name: 'Admin BOARDLINK',       username: 'admin',     role: 'Administrator',   status: 'Active',   lastLogin: 'March 12, 2026' },
    { id: 8, name: 'Dr. Karen Navarro',     username: 'knavarro',  role: 'Council Member',  status: 'Inactive', lastLogin: 'Feb 28, 2026'   },
];

// RBAC Permission Matrix (what each role can do)
const rolePermissions = {
    'Administrator'  : ['view', 'upload', 'edit', 'delete', 'manage_users', 'export'],
    'Board Secretary': ['view', 'upload', 'edit', 'export', 'create_agenda', 'manage_minutes'],
    'Trustee'        : ['view', 'comment', 'download'],
    'Council Member' : ['view', 'comment'],
    'Staff'          : ['view', 'upload'],
};

// GET /users — List All Users
const getUsers = (req, res) => {
    res.render('users/index', {
        title          : 'User Management | BOARDLINK',
        active         : 'users',
        users          : users,
        rolePermissions: rolePermissions,
    });
};

// GET /users/:id — View User Profile
const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).render('404', { title: 'User Not Found | BOARDLINK' });
    }

    const permissions = rolePermissions[user.role] || [];

    res.render('users/view', {
        title      : `${user.name} | BOARDLINK`,
        active     : 'users',
        user       : user,
        permissions: permissions,
    });
};

// GET /users/add — Show Add User Form
const getAddUser = (req, res) => {
    res.render('users/add', {
        title : 'Add User | BOARDLINK',
        active: 'users',
        roles : Object.keys(rolePermissions),
    });
};

// POST /users/add — Handle Add User Form
const postAddUser = (req, res) => {
    const { fullName, username, role, email } = req.body;

    if (!fullName || !username || !role || !email) {
        return res.render('users/add', {
            title : 'Add User | BOARDLINK',
            active: 'users',
            roles : Object.keys(rolePermissions),
            error : 'All fields are required.',
        });
    }

    res.render('users/add', {
        title  : 'Add User | BOARDLINK',
        active : 'users',
        roles  : Object.keys(rolePermissions),
        success: `User "${fullName}" has been added with the role of ${role}.`,
    });
};

module.exports = { getUsers, getUserById, getAddUser, postAddUser };
