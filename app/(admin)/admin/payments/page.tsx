"use client"

import { useEffect, useState } from "react"
import {
  Search,
  Trash2,
  Eye,
  Filter,
  Download,
  CreditCard,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { API_URL } from "@/config"

type Payments = {
  _id: string;
  firstName: string;
  lastName: String;
  email: string;
  phone: string;
  amount: string;
  packageName: string;
  city: string;
  stripePaymentIntentId: string;
  primaryArea1: string;
  createdAt: string;
  license: string;
  isPaid: boolean;
  brokerName: string;
  zipCode: string
  mlsId: string;
  brokerageName: string
  officeEmail: string
  secondaryArea1: string
  secondaryArea2: string
  serviceRadius: string
  primaryArea2: string
  state: string
  isDeleted: boolean
  officePhone: string

};

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payments[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payments | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/pakages/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch inquiries");
        return res.json();
      })
      .then((data: Payments[]) => {
        // Filter out deleted, then sort by createdAt descending
        const filteredSorted = data
          .filter((inq) => !inq.isDeleted)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
        setPayments(filteredSorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter payments based on search term and status filter
  const filteredPayments = payments.filter((payment) => {
  const fullName = `${payment.firstName || ""} ${payment.lastName || ""}`.toLowerCase();
  const email = payment.email?.toLowerCase() || "";
  const id = payment._id?.toLowerCase() || "";
  const isPaidText = payment.isPaid ? "true" : "false";

  const matchesSearch =
    fullName.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase()) ||
    id.includes(searchTerm.toLowerCase()) ||
    isPaidText.includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter !== null ? payment.isPaid === (statusFilter === "true") : true;

  return matchesSearch && matchesStatus;
});



  // Handle payment deletion
  const handleDelete = async (id: string) => {
  if (!id) {
    console.error('Invalid id:', id);
    return;
  }
  try {
    const response = await fetch(`${API_URL}/pakages/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete inquiry');
    }
    setPayments(payments.filter((payment) => payment._id !== id));
  } catch (error) {
    console.error('Error deleting Inquiry:', error);
  }
};

  // Get status badge color
  const getStatusBadge = (isPaid: boolean) => {
  return isPaid
    ? "bg-green-100 text-green-800" // Completed
    : "bg-yellow-100 text-yellow-800"; // Pending
};


  // Get status icon
const getStatusIcon = (status: boolean) => {
  if (status === true) {
    return <CheckCircle size={16} className="text-green-600" />
  } else {
    return <Clock size={16} className="text-yellow-600" />
  }
}

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search payments..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>
                    <CheckCircle size={16} className="mr-2 text-green-600" />
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
                    <Clock size={16} className="mr-2 text-yellow-600" />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Failed")}>
                    <XCircle size={16} className="mr-2 text-red-600" />
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("Refunded")}>
                    <CreditCard size={16} className="mr-2 text-blue-600" />
                    Refunded
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Package</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.firstName} {payment.lastName}</div>
                      <div className="text-sm text-gray-500">{payment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{payment.phone}</TableCell>
                  
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
<TableCell className="hidden lg:table-cell font-bold">
  {payment.packageName.charAt(0).toUpperCase() + payment.packageName.slice(1)}
</TableCell>
                 <TableCell>
  <div className="flex items-center">
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadge(
        payment.isPaid
      )}`}
    >
      {getStatusIcon(payment.isPaid)}
      {payment.isPaid ? "Completed" : "Pending"}
    </span>
  </div>
</TableCell>


                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedPayment(payment)}
                          >
                            <Eye size={16} />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                            <DialogDescription>View payment information</DialogDescription>
                          </DialogHeader>

                          <div className="py-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-bold">License: {payment.license}</h3>
                                <div className="text-sm font-medium text-gray-800">
                                  <p>MLS ID: <span className="font-semibold">{payment.mlsId}</span></p>
                                  </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Calendar size={14} className="mr-1" />
                                  <span>{new Date(payment.createdAt).toLocaleString()}</span>
                                </div>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusBadge(
                                  payment.isPaid,
                                )}`}
                              >
                                {getStatusIcon(payment.isPaid)}
                                {payment.isPaid}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-200 py-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                    <User size={20} className="text-gray-500" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{payment.firstName} {payment.lastName}</p>
                                    <p className="text-sm text-gray-500">{payment.email}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Amount</h4>
                                <p className="text-2xl font-bold">${payment.amount}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Package Type</h4>
                                <div className="flex items-center">
                                  <CreditCard size={16} className="mr-2 text-gray-500" />
                                  <span>{payment.packageName}</span>
                                  {/* {payment.name && (
                                    <span className="ml-1">
                                      ({payment.createdAt} ending in {payment.name})
                                    </span>
                                  )} */}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-1">Transaction ID</h4>
                                <p>{payment.stripePaymentIntentId}</p>
                              </div>
                            </div>
                             

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-1">Brokerage Information</h4>
                             {payment.primaryArea1 && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm font-semibold text-gray-500 mb-1">Broker Name:  <span className="font-normal">{payment.brokerName}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Brokerage Name:  <span className="font-normal">{payment.brokerageName}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Office Email:  <span className="font-normal">{payment.officeEmail}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Office Phone:  <span className="font-normal">{payment.officePhone}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Address:  <span className="font-normal">{payment.city} {payment.state}, {payment.zipCode}</span></p>

                              </div>
                            )}
                             <h4 className="text-sm font-medium text-gray-500 mb-1">Address Information</h4>
                            {payment.primaryArea1 && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <p className="text-sm font-semibold text-gray-500 mb-1">Primary Area1:  <span className="font-normal">{payment.primaryArea1}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Primary Area 2:  <span className="font-normal">{payment.primaryArea2}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Secondary Area 1:  <span className="font-normal">{payment.secondaryArea1}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Secondary Area 2:  <span className="font-normal">{payment.secondaryArea2}</span></p>
                                <p className="text-sm font-semibold text-gray-500 mb-1">Service Radius:  <span className="font-normal">{payment.serviceRadius}</span></p>

                              </div>
                            )}
                            </div>
                          </div>

                          <DialogFooter>
                            {/* <Button variant="outline" className="mr-2">
                              <Download size={16} className="mr-2" />
                              Download Receipt
                            </Button> */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete Record</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this payment record and
                                    remove the data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      handleDelete(payment._id)
                                      setSelectedPayment(null)
                                    }}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="h-8 w-8 p-0">
                            <Trash2 size={16} />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this payment record and remove
                              the data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(payment._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
