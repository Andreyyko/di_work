"use client"

import { useState } from "react";
import MethodsList from "./MethodList"

const MethodicsListUse = () => {
    const [activeTab, setActiveTab] = useState("methodologies");
return(
    <div>
    {activeTab === "methodologies" && (
        <div className="pt-37.5 md:pt-0">
          {" "}
          <MethodsList />{" "}
        </div>
      )}
      </div>
)
}

export default MethodicsListUse