"use client";

import { Input, type InputProps } from "@/components/ui/input";
import React from "react";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <>
        <Input type={showPassword ? "text" : "password"} ref={ref} {...props} />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Hide password" : "Show password"}
          className="text-sm"
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
