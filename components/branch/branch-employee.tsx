// "use client";

// import { useState, useMemo, useEffect } from "react";
// import { getAllOrgMembers, User } from "@/services/user.service";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   MoreHorizontal,
//   ExternalLink,
//   Mail,
//   FileText,
//   UserCog,
// } from "lucide-react";
// import { getBranchMembers } from "@/services/branch.service";

// interface BranchEmployeesTableProps {
//   organizationId: number;
//   branchId: number;
//   onViewDetails?: (employeeId: number) => void;
// }

// export function BranchEmployeesTable({
//   organizationId,
//   branchId,
//   onViewDetails,
// }: BranchEmployeesTableProps) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [employees, setEmployees] = useState<User[]>([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const members = await getBranchMembers(organizationId, branchId);
//         setEmployees(members);
//         console.log("Fetched employees:", members);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     if (organizationId && branchId) {
//       fetchEmployees();
//     }
//   }, [organizationId, branchId]);

//   const filteredEmployees = useMemo(() => {
//     return employees.filter((employee) => {
//       const matchesSearch =
//         employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.position?.toLowerCase().includes(searchTerm.toLowerCase());

//       return matchesSearch;
//     });
//   }, [employees, searchTerm]);

//   const renderStatusBadge = (status?: string) => {
//     switch (status) {
//       case "active":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-green-50 text-green-700 border-green-200"
//           >
//             Active
//           </Badge>
//         );
//       case "inactive":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-red-50 text-red-700 border-red-200"
//           >
//             Inactive
//           </Badge>
//         );
//       case "pending":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-yellow-50 text-yellow-700 border-yellow-200"
//           >
//             Pending
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">Unknown</Badge>;
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search employees..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Department</TableHead>
//               <TableHead>Position</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Created</TableHead>
//               <TableHead className="w-[80px]"></TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredEmployees.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={7}
//                   className="text-center py-8 text-muted-foreground"
//                 >
//                   No employees found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredEmployees.map((employee) => (
//                 <TableRow
//                   key={employee.id}
//                   className="cursor-pointer hover:bg-muted/50"
//                   onClick={() => onViewDetails?.(employee.id)}
//                 >
//                   <TableCell className="font-medium">
//                     {employee.name || "N/A"}
//                   </TableCell>
//                   <TableCell>{employee.email || "N/A"}</TableCell>
//                   <TableCell>{employee.department || "N/A"}</TableCell>
//                   <TableCell>{employee.position || "N/A"}</TableCell>
//                   <TableCell>{renderStatusBadge(employee.status)}</TableCell>
//                   <TableCell>
//                     {employee.created_at
//                       ? new Date(employee.created_at).toLocaleDateString()
//                       : "N/A"}
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger
//                         asChild
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal className="h-4 w-4" />
//                           <span className="sr-only">Open menu</span>
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onViewDetails?.(employee.id);
//                           }}
//                         >
//                           <ExternalLink className="mr-2 h-4 w-4" />
//                           <span>Details</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
//                           <Mail className="mr-2 h-4 w-4" />
//                           <span>Send Email</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
//                           <FileText className="mr-2 h-4 w-4" />
//                           <span>View Tests</span>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
//                           <UserCog className="mr-2 h-4 w-4" />
//                           <span>Edit Profile</span>
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
