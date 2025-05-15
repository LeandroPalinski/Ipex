
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const SummaryCard = ({ title, icon: Icon, children }) => (
  <motion.div variants={itemVariants} className="flex-1">
    <Card className="h-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-5 w-5 text-primary" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </motion.div>
);

export default SummaryCard;
