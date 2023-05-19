import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Checkbox,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SubDepartment {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

const Second1: React.FC = () => {
  // Hardcoded JSON data
  const departments: Department[] = [
    {
      id: 1,
      name: "Customer_service",
      subDepartments: [
        {
          id: 1,
          name: "Support",
        },
        {
          id: 2,
          name: "Customer_success",
        },
      ],
    },
    {
      id: 2,
      name: "Design",
      subDepartments: [
        {
          id: 4,
          name: "Graphic_design",
        },
        {
          id: 5,
          name: "Product_design",
        },
        {
          id: 6,
          name: "Web_design",
        },
      ],
    },
  ];

  // State for expanded departments
  const [expandedDepartments, setExpandedDepartments] = useState<number[]>([]);

  // State for selected departments and sub-departments
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    number[]
  >([]);

  // Handle toggle of department expand/collapse
  const handleToggleDepartment = (departmentId: number) => {
    if (expandedDepartments.includes(departmentId)) {
      setExpandedDepartments(
        expandedDepartments.filter((id) => id !== departmentId)
      );
    } else {
      setExpandedDepartments([...expandedDepartments, departmentId]);
    }
  };

  // Handle change of department checkbox selection
  const handleDepartmentCheckboxChange = (departmentId: number) => {
    if (selectedDepartments.includes(departmentId)) {
      // Deselect the department and its sub-departments
      setSelectedDepartments(
        selectedDepartments.filter((id) => id !== departmentId)
      );
      setSelectedSubDepartments(
        selectedSubDepartments.filter(
          (subDepartmentId) => !isSubDepartmentOf(departmentId, subDepartmentId)
        )
      );
    } else {
      // Select the department and its sub-departments
      setSelectedDepartments([...selectedDepartments, departmentId]);
      setSelectedSubDepartments([
        ...selectedSubDepartments,
        ...(departments
          .find((department) => department.id === departmentId)
          ?.subDepartments?.map((subDepartment) => subDepartment.id) ?? []),
      ]);
    }
  };

  // Handle change of sub-department checkbox selection
  const handleSubDepartmentCheckboxChange = (
    subDepartmentId: number,
    departmentId: number
  ) => {
    if (selectedSubDepartments.includes(subDepartmentId)) {
      // Deselect the sub-department
      setSelectedSubDepartments(
        selectedSubDepartments.filter((id) => id !== subDepartmentId)
      );

      // Check if parent department needs to be deselected
      const parentDepartmentId = getParentDepartmentId(subDepartmentId);
      if (parentDepartmentId) {
        const parentDepartment = departments.find(
          (department) => department.id === parentDepartmentId
        );
        if (
          parentDepartment &&
          selectedSubDepartments.some((id) =>
            isSubDepartmentOf(parentDepartmentId, id)
          )
        ) {
          setSelectedDepartments(
            selectedDepartments.filter((id) => id !== parentDepartmentId)
          );
        }
      }
    } else {
      // Select the sub-department
      setSelectedSubDepartments([...selectedSubDepartments, subDepartmentId]);

      // Check if parent department needs to be selected
      const department = departments.find(
        (department) => department.id === departmentId
      );
      if (
        department &&
        department.subDepartments.every((subDepartment) =>
          selectedSubDepartments.includes(subDepartment.id)
        )
      ) {
        setSelectedDepartments([...selectedDepartments, departmentId]);
      }
    }
  };

  // Check if a department is expanded
  const isDepartmentExpanded = (departmentId: number) => {
    return expandedDepartments.includes(departmentId);
  };

  // Check if a department is selected
  const isDepartmentSelected = (departmentId: number) => {
    return selectedDepartments.includes(departmentId);
  };

  // Check if a sub-department is selected
  const isSubDepartmentSelected = (subDepartmentId: number) => {
    return selectedSubDepartments.includes(subDepartmentId);
  };

  // Check if a sub-department belongs to a department
  const isSubDepartmentOf = (departmentId: number, subDepartmentId: number) => {
    const department = departments.find(
      (department) => department.id === departmentId
    );
    return department?.subDepartments.some(
      (subDepartment) => subDepartment.id === subDepartmentId
    );
  };

  // Get the parent department ID of a sub-department
  const getParentDepartmentId = (subDepartmentId: number) => {
    const department = departments.find((department) =>
      department.subDepartments.some(
        (subDepartment) => subDepartment.id === subDepartmentId
      )
    );
    return department?.id;
  };

  // Check if all sub-departments of a department are selected
  const isAllSubDepartmentsSelected = (departmentId: number) => {
    const department = departments.find(
      (department) => department.id === departmentId
    );
    if (department) {
      return department.subDepartments.every((subDepartment) =>
        selectedSubDepartments.includes(subDepartment.id)
      );
    }
    return false;
  };

  // Handle select/deselect all sub-departments of a department
  const handleSelectAllSubDepartments = (departmentId: number) => {
    const department = departments.find(
      (department) => department.id === departmentId
    );
    if (department) {
      const allSubDepartmentIds = department.subDepartments.map(
        (subDepartment) => subDepartment.id
      );
      setSelectedSubDepartments((prevSelectedSubDepartments) => {
        const updatedSelectedSubDepartments = [...prevSelectedSubDepartments];
        if (isAllSubDepartmentsSelected(departmentId)) {
          // Deselect all sub-departments
          allSubDepartmentIds.forEach((subDepartmentId) => {
            const index =
              updatedSelectedSubDepartments.indexOf(subDepartmentId);
            if (index !== -1) {
              updatedSelectedSubDepartments.splice(index, 1);
            }
          });
        } else {
          // Select all sub-departments
          updatedSelectedSubDepartments.push(...allSubDepartmentIds);
        }
        return updatedSelectedSubDepartments;
      });

      setSelectedDepartments((prevSelectedDepartments) => {
        const updatedSelectedDepartments = [...prevSelectedDepartments];
        if (isAllSubDepartmentsSelected(departmentId)) {
          // Deselect the department
          const index = updatedSelectedDepartments.indexOf(departmentId);
          if (index !== -1) {
            updatedSelectedDepartments.splice(index, 1);
          }
        } else {
          // Select the department
          if (!updatedSelectedDepartments.includes(departmentId)) {
            updatedSelectedDepartments.push(departmentId);
          }
        }
        return updatedSelectedDepartments;
      });
    }
  };

  return (
    <>
    <h1
        style={{
          textAlign: "center",
          paddingTop: 20,
          paddingBottom: 5,
          textDecorationLine: "underline",
        }}
      >
        List Component
      </h1>
      <div style={{
          height: 350,
          width: "85%",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
      <List>
        {departments.map((department) => (
          <div key={department.id}>
            <ListItem
              button
              onClick={() => handleToggleDepartment(department.id)}
            >
              <Checkbox
                checked={isDepartmentSelected(department.id)}
                indeterminate={isAllSubDepartmentsSelected(department.id)}
                onChange={() => handleDepartmentCheckboxChange(department.id)}
              />
              <ListItemText>
                <Typography variant="body1">{department.name}</Typography>
              </ListItemText>
              {isDepartmentExpanded(department.id) ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={isDepartmentExpanded(department.id)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {department.subDepartments.map((subDepartment) => (
                  <ListItem
                    key={subDepartment.id}
                    button
                    style={{ paddingLeft: "2rem" }}
                  >
                    <Checkbox
                      checked={isSubDepartmentSelected(subDepartment.id)}
                      onChange={() =>
                        handleSubDepartmentCheckboxChange(
                          subDepartment.id,
                          department.id
                        )
                      }
                    />
                    <ListItemText>
                      <Typography variant="body2">
                        {subDepartment.name}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List></div>
    </>
  );
};

export default Second1;
