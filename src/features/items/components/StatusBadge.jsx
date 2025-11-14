import React from 'react';
import { STATUS_CONFIG } from '../../../utils/constants';

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.YARATILGAN;

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
        >
      {config.label}
    </span>
    );
};

export default StatusBadge;