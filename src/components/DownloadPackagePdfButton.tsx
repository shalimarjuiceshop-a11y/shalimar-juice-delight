import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { generateFranchisePdf, type FranchisePdfData } from "@/lib/franchisePdf";

interface Props {
  data: FranchisePdfData;
  label?: string;
}

const DownloadPackagePdfButton = ({ data, label = "Download Package PDF" }: Props) => {
  return (
    <motion.button
      onClick={() => generateFranchisePdf(data)}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 bg-foreground text-background font-body text-sm font-semibold px-6 py-3 rounded-full hover:brightness-110 transition-all shadow-md border border-border"
    >
      <FileDown size={16} />
      {label}
    </motion.button>
  );
};

export default DownloadPackagePdfButton;
