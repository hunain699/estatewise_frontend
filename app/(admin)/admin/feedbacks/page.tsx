"use client"

import { useEffect, useState } from "react"
import { Search, Trash2, Star, Eye, User, Calendar, Plus } from "lucide-react"
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
import Link from "next/link"
import { API_URL } from '@/config'

// Mock data for feedbacks
type Feedback = {
  _id: string
  name: string
  email: string
  rating: number
  comment: string
  status: "Published" | "Pending"
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminFeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [loading, setLoading] = useState(false);

  // Fetch feedbacks from API
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/feedbacks/`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out deleted feedbacks if needed
        const validFeedbacks = data.filter((fb: Feedback) => !fb.isDeleted)
        setFeedbacks(validFeedbacks)
      })
      .catch((err) => console.error("Failed to fetch feedbacks:", err))
      setLoading(false);
  }, [])

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle feedback deletion (soft delete)
  const handleDelete = async (_id: string) => {
  try {
    const res = await fetch(`${API_URL}/feedbacks/${_id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      // Remove the deleted feedback from state
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== _id))
    } else {
      console.error("Failed to delete feedback:", await res.text())
    }
  } catch (error) {
    console.error("Error deleting feedback:", error)
  }
}

  // Handle status change
  const handleStatusChange = async (_id: string, newStatus: "Published" | "Pending") => {
  try {
    // Optimistically update UI
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback._id === _id ? { ...feedback, status: newStatus } : feedback,
      )
    );

    // Send PATCH request to toggle status
    await fetch(`${API_URL}/feedbacks/${_id}/toggle-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to toggle status:", error);
    // Optionally revert UI or notify user
  }
};


  // Render stars based on rating
  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  )
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Feedback Management</h1>
        <Link href="/admin/feedbacks/new">
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    Add New Feedback
                  </Button>
                </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search feedbacks..."
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
                <TableHead>Rating</TableHead>
                <TableHead className="hidden lg:table-cell">Comment</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.map((feedback) => (
                <TableRow key={feedback._id}>
                  <TableCell className="font-medium">{feedback.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{feedback.email}</TableCell>
                  <TableCell>{renderStars(feedback.rating)}</TableCell>
                  <TableCell className="hidden lg:table-cell max-w-xs truncate">{feedback.comment}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(feedback.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        feedback.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {feedback.status}
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
                            onClick={() => setSelectedFeedback(feedback)}
                          >
                            <Eye size={16} />
                            <span className="sr-only">View</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Feedback Details</DialogTitle>
                            <DialogDescription>View customer feedback information</DialogDescription>
                          </DialogHeader>

                          <div className="py-4 space-y-4">
                            <div className="flex items-center">
                              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                <User size={24} className="text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <h3 className="font-medium">{feedback.name}</h3>
                                <p className="text-sm text-gray-500">{feedback.email}</p>
                              </div>
                              <div className="ml-auto">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    feedback.status === "Published"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {feedback.status}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Calendar size={16} className="mr-2 text-gray-500" />
                                <span className="text-sm text-gray-500">
                                  {new Date(feedback.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex">{renderStars(feedback.rating)}</div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500 mb-2">Feedback</h4>
                              <div className="bg-gray-50 p-4 rounded-md">
                                <p className="whitespace-pre-line">{feedback.comment}</p>
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            {feedback.status === "Pending" ? (
                              <Button
                                variant="outline"
                                className="mr-2"
                                onClick={() => {
                                  handleStatusChange(feedback._id, "Published")
                                  setSelectedFeedback(null)
                                }}
                              >
                                Publish Feedback
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                className="mr-2"
                                onClick={() => {
                                  handleStatusChange(feedback._id, "Pending")
                                  setSelectedFeedback(null)
                                }}
                              >
                                Unpublish Feedback
                              </Button>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete Feedback</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this feedback and remove
                                    the data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      handleDelete(feedback._id)
                                      setSelectedFeedback(null)
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
                              This action cannot be undone. This will permanently delete this feedback and remove the
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(feedback._id)}
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
