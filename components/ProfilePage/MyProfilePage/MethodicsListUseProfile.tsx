"use client";

import { useState } from "react";
import MethodsList from "./MethodListProfile";

const MethodicsListUseProfile = () => {
  const [activeTab, setActiveTab] = useState("methodologies");
  return (
    <div>
      {activeTab === "methodologies" && (
        <div className="pt-37.5 md:pt-0">
          {" "}
          <MethodsList />{" "}
        </div>
      )}
    </div>
  );
};

export default MethodicsListUseProfile;
