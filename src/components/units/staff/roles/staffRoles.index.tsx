import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../../../commons/apiInstance/apiInstance";
import { roles } from "../add/staffAdd.index";
import { Select } from "antd";

interface AssignableRoles {
  currentRoleIds: number[];
  roles: roles[];
}
// interface Role {
//     id: number;
//     name: string;
//     description: string;
//     permissions: Permissions[]; // permissions의 타입을 알 수 없으므로 임시로 any 사용
//   }

const StaffRoles: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const staffId = parseInt(id!);
  const [roles, setRoles] = useState<AssignableRoles | null>(null);

  useEffect(() => {
    apiInstance
      .get(`/staffs/${staffId}/change-role`)
      .then((response) => {
        // setStaffDetail(response.data);
        console.log(response.data);
        const data = response.data;
        // setRoles(data);
        // console.log("roles:" , roles);
        // console.log(response.data.message);
        setRoles(data);
        data.currentRoleIds.forEach((id: any) => {
          const role = data.roles.find((role: any) => role.id === id);
          if (role) {
            console.log(role.name);
          }
        });
        // navigate("/staffPage/roles");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("끝");
      });
  }, []);

  return (
    <>
      {/* 테스트용 */}
      <div>직원 현재 역할 조회 및 역할 변경</div>
      {/* { roles && <p>{roles.currentRoleIds}</p>} */}
      <p>현재 역할</p>
      {roles?.currentRoleIds.map((roleId, index) => (
        <p key={index}>{roleId}</p>
      ))}
      <p>변경할 역할</p>
      <Select>
        {roles?.roles.map((roles) => (
          <Select.Option key={roles.id}>
            {roles.name}: {roles.description}
          </Select.Option>
        ))}
      </Select>
    </>
  );
};

export default StaffRoles;
