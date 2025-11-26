import { useFormikContext } from "formik";
import Toggle from "./Toggle";
import { SecurityFormValues } from "./types";

const Security_2FA = () => {
  const { values, setFieldValue } = useFormikContext<SecurityFormValues>();

  return (
    <div className="bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
      <Toggle
        checked={values.twoFactorEnabled}
        onChange={(val) => setFieldValue("twoFactorEnabled", val)}
        label="Two-Factor Authentication (2FA)"
        description="Add an extra layer of security to your account by requiring a code when logging in."
      />
    </div>
  );
};

export default Security_2FA;
