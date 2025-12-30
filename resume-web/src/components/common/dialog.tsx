import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, 
  AlertDialogTrigger 
} from "../ui/alert-dialog"

interface DialogProps {
  triggerName: string
  title: string
  description: string

  actionName?:string
}

export const Dialog = ({triggerName, title, actionName}: DialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{triggerName}</AlertDialogTrigger>
      <AlertDialogContent className="dark border border-gray-500">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {actionName? <AlertDialogAction>{actionName}</AlertDialogAction>: null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}