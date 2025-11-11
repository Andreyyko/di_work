import React from "react";

const IdentityIntro: React.FC = () => {
  return (
    <section className="w-full px-6 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-center gap-6">
        <div className="">
          <img
            src="/your-image.jpg"
            alt="Відкрита книга"
            className="w-40 h-auto"
          />
        </div>

        <div className="max-w-4xl text-center md:text-left space-y-4">
          <p className="text-sm md:text-base font-medium mt-3">
            Ресурсно-орієнтований когнітивно поведінковий
          </p>
        </div>
      </div>
    </section>
  );
};

export default IdentityIntro;
