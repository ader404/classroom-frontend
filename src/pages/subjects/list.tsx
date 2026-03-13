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
                <div className="action-row flex flex-col sm:flex-row justify-between items-center w-full gap-4 mt-4">
                    <div className="search-field relative w-full sm:max-w-sm">
                        <Search className="search-icon absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name ..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center">
                        <Select
                            value={selectDepartment}
                            onValueChange={setSelectDepartment}>

                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by Department" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Departments
                                </SelectItem>

                                {DEPARTMENT_OPTIONS.map((department) => (
                                    <SelectItem key={department.value} value={department.value}>
                                        {department.label}
                                    </SelectItem>
                                )) as any}
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