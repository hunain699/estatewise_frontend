"use client"

import { useEffect, useState } from "react"
import { Search, Trash2, Mail, Eye, User, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_URL } from '@/config'
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

// Mock data for inquiries
type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  timeframe: string;
  property_address: string;
  city: string;
  property_type: string;
  message: string;
  isResponse: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch inquiries from API on component mount
 useEffect(() => {
  setLoading(true);
  fetch(`${API_URL}/Inquiries/`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return res.json();
    })
    .then((data: Inquiry[]) => {
      // Filter out deleted, then sort by createdAt descending
      const filteredSorted = data
        .filter((inq) => !inq.isDeleted)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setInquiries(filteredSorted);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []);


  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle inquiry deletion (local state only here)
  const handleDelete = async (id: string) => {
  if (!id) {
    console.error('Invalid id:', id);
    return;
  }
  try {
    const response = await fetch(`${API_URL}/inquiries/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete inquiry');
    }
    setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
  } catch (error) {
    console.error('Error deleting Inquiry:', error);
  }
};

  // Handle marking as responded (local state only here)
  const handleMarkAsResponded = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/Inquiries/${id}/toggle-response`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update inquiry response status');
    }

    const data = await response.json();

    setInquiries((prevInquiries) =>
      prevInquiries.map((inquiry) =>
        inquiry._id === id ? { ...inquiry, isResponse: data.isResponse } : inquiry
      )
    );
  } catch (error) {
    console.error('Error updating inquiry response:', error);
    // Optionally show an error message to the user
  }
};


if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }
  if (error) return <p>Error loading inquiries: {error}</p>;


  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inquiries Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search inquiries..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Property Type</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry._id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{inquiry.email}</TableCell>
                  <TableCell className="hidden lg:table-cell">{inquiry.property_type}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                 <TableCell>
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      inquiry.isResponse === false ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
    }`}
  >
    {inquiry.isResponse === false ? "New" : "Responded"}
  </span>
</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye size={16} />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Inquiry Details</DialogTitle>
                            <DialogDescription>View inquiry information</DialogDescription>
                          </DialogHeader>

                          <div className="py-4 space-y-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <User size={24} className="text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <h3 className="font-medium">{inquiry.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Mail size={14} className="mr-1" />
                                  <span>{inquiry.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Phone size={14} className="mr-1" />
                                  <span>{inquiry.phone}</span>
                                </div>
                              </div>
                              <div className="ml-auto">
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      inquiry.isResponse === false
        ? "bg-green-100 text-green-800"
        : "bg-blue-100 text-blue-800"
    }`}
  >
    {inquiry.isResponse === false ? "New" : "Responded"}
  </span>
</div>

                            </div>

                            <div>
                              <div className="flex items-center text-sm text-gray-500 mb-1">
                                <Calendar size={14} className="mr-1" />
                                <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                              </div>
                              <h4 className="text-lg font-medium">{inquiry.property_address}, {inquiry.city}</h4>
                            </div>

                            {inquiry._id && (
                              <div className="bg-gray-50 p-3 rounded-md">
                                <h4 className="text-sm font-medium text-gray-500">Property Type</h4>
                                <p className="font-medium">{inquiry.property_type}</p>
                              </div>
                            )}

                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
                              <div className="bg-gray-50 p-4 rounded-md">
                                <p className="whitespace-pre-line">{inquiry.message}</p>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
  {!inquiry.isResponse && (
    <Button
      variant="outline"
      className="mr-2"
      onClick={() => {
        handleMarkAsResponded(inquiry._id);
        setSelectedInquiry(null);
      }}
    >
      Mark as Responded
    </Button>
  )}
</DialogFooter>

                        </DialogContent>
                      </Dialog>

                      {/* <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Mail size={16} />
                        <span className="sr-only">Reply</span>
                      </Button> */}

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
                              This action cannot be undone. This will permanently delete this inquiry and remove the
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(inquiry._id)}
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
