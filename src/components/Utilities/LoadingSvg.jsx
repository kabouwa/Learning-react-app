import { motion } from "framer-motion"


export default function LoadingSvg({ classes, size = 74,  hidden = false }) {
    return (
        <>
            {
                !hidden && 
                (
                    <motion.svg transition={{ ease: 'easeInOut' }} animate={{ opacity: [0, 1] }} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="M12 2v4" />
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="m16.2 7.8 2.9-2.9"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="M18 12h4"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="m16.2 16.2 2.9 2.9"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="M12 18v4"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="m4.9 19.1 2.9-2.9"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="M2 12h4"/>
                        <motion.path transition={{ ease: 'easeInOut', duration: 3, repeat: Infinity}} animate={{ rotate: [0,180,0,-180,0] }} d="m4.9 4.9 2.9 2.9"/>
                    </motion.svg>
                )
            }
        </>
    )
}