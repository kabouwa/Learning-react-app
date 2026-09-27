import { motion } from "framer-motion"

export default function StatCard({ icon: Icon, label, value, color = "text-blue-700", bg = "bg-blue-50", classes }) {
  return (
    <motion.div whileHover={{ y: '-7px'}} className={`bg-white/99 dark:bg-gray-800 w-full rounded-xl py-4 px-6 flex gap-3 items-center justify-between text-dark dark:text-white overflow-hidden ${classes}`}>
        <div className={`p-2.5 ${color} ${bg} rounded`}>
            <Icon size={20} />
        </div>

        <div className="flex-1 flex flex-col">
            <small className="text-gray-500 dark:text-gray-300 text-sm">{label}</small>
            <p className="font-bold text-black/99 dark:text-white m-0">{value}</p>
        </div>
    </motion.div>
  )
}