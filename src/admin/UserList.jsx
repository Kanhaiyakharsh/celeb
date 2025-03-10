import React from "react";
import { approveKYC, rejectKYC } from "../admin/api/users.js";

const UserList = ({ users, refreshUsers }) => {
  const handleApprove = async (userId) => {
    await approveKYC(userId);
    refreshUsers();
  };

  const handleReject = async (userId) => {
    await rejectKYC(userId);
    refreshUsers();
  };

  return (
    <div className="box">
      <h3 className="title is-4 ">User List</h3>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>KYC Docs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.role ? user.role.toLowerCase() : "Unknown"}</td>

              <td>
                <span
                  className={`tag ${
                    user.kycStatus.toLowerCase() === "approved"
                      ? "is-success"
                      : user.kycStatus.toLowerCase() === "rejected"
                      ? "is-danger"
                      : "is-warning"
                  }`}
                >
                  {user.kycStatus}
                </span>
              </td>
              <td>
               {console.log("KYC Document URL:", user.kycDocument)}
                <a
                  // href={user.kycDocument}
                  href={`http://localhost:4000/${user.kycDocument}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-link is-small is-light"
                >
                  View Document
                </a>
              </td>
              <td>
                {user.kycStatus.toLowerCase() === "pending" && (
                  <div className="buttons">
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="button is-success is-small"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="button is-danger is-small"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
