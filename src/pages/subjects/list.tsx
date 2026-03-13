import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelect } from "@refinedev/core"
import { useTable } from "@refinedev/react-table"
import { DEPARTMENT_OPTIONS, DEPARTMENTS } from "@/constants"
import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Subject } from "@/types"
import { ColumnDef } from "@tanstack/react-table"


const SubjectsList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectDepartment, setSelectDepartment] = useState("");

    const departmentFilters = selectDepartment === "all" ? [] : [
        {
            field: "department",
            operator: "eq" as const,
            value: selectDepartment,
        },
    ];
    const searchFilters = searchQuery ? [
        {
            field: "name",
            operator: "contains" as const,
            value: searchQuery
        },
    ] : [];

    const subjectTable = useTable<Subject>({
        columns: useMemo<ColumnDef<Subject>[]>(() => [
            {
                id: 'code',
                accessorKey: 'code',
                size: 100,
                header: () => <p className="column-title ml-2"> Code</p>,
                cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
            },
            {
                id: 'name',
                accessorKey: 'name',
                size: 200,
                header: () => <p className="column-title ml-2"> Name</p>,
                cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
                filterFn: "includesString",
            },
            {
                id: 'department',
                accessorKey: 'department',
                size: 150,
                header: () => <p className="column-title "> Department</p>,
                cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>()}</Badge>,
                filterFn: "includesString",
            },
            {
                id: 'description',
                accessorKey: 'description',
                size: 200,
                header: () => <p className="column-title ml-2"> Description</p>,
                cell: ({ getValue }) => <span className="truncate line-clamp-2 ">{getValue<string>()}</span>,
                filterFn: "includesString",
            },

        ], []),
        refineCoreProps: {
            resource: "subjects",
            pagination: { pageSize: 10, mode: "server" },
            filters: {
                permanent: [...departmentFilters],
            },
            sorters: {
                initial: [
                    {
                        field: "id",
                        order: "desc",
                    },
                ],
            },
        }

    });
    return (
        <ListView >
            <Breadcrumb />
            <h1 className="page-title">Subjects</h1>
            <div className="intro-row">
                <p>Quick access to essential metrics and management tools</p>
                <div className="action-row">
                    <div className="search-field">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name ..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select
                            value={selectDepartment}
                            onValueChange={setSelectDepartment}>

                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Department" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Departments
                                </SelectItem>

                                {DEPARTMENT_OPTIONS.map((department) => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>

                        <CreateButton />


                    </div>
                </div>
            </div>
            <DataTable table={subjectTable} />
        </ListView>
    )
}

export default SubjectsList        