import Link from "next/link";
import React from "react";
import {
  CodeSnippetCopy,
  LinkHierarchy,
  MainTitleNew,
  NoteText,
  WarningText,
} from "../../../../comps/docs/v1/DocsV1Components";
import styles from "../../../../styles/docs/v1.module.css";
import { useTranslation } from "react-i18next";

const Swift = () => {
  const [t, i18n] = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div
        dir={language == "ar" ? "rtl" : "ltr"}
        className={`${styles.purpose}`}
      >
        <LinkHierarchy
          parent={t("docs.Prerequisites.IOS_SDK")}
          child={t("docs.Trouble_Shooting.Trouble_Shooting")}
        />
        <MainTitleNew title={t("docs.Trouble_Shooting.Trouble_Shooting")} />
        {/* <hr /> */}
        <div className="fs-5 text-dark mt-3">
          <WarningText text={t("docs.Trouble_Shooting.warning")} />

          <NoteText text={t("docs.Trouble_Shooting.note1")} />

          <div dir={language == "ar" ? "ltr" : "rtl"}>
            <CodeSnippetCopy
              title="script"
              code={`FRAMEWORK="MFSDK"
FRAMEWORK_EXECUTABLE_PATH="\${BUILT_PRODUCTS_DIR}/\${FRAMEWORKS_FOLDER_PATH}/$FRAMEWORK.framework/$FRAMEWORK"
EXTRACTED_ARCHS=()
for ARCH in $ARCHS
do
lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"
EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")
done
lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "\${EXTRACTED_ARCHS[@]}"
rm "\${EXTRACTED_ARCHS[@]}"
rm "$FRAMEWORK_EXECUTABLE_PATH"
mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"
`}
            />
          </div>

          <NoteText text={t("docs.Trouble_Shooting.note2")} />

          {/* <img src='/docs/v1/9.png' width="800px" className='mt-2 mt-3' /> */}
        </div>
      </div>
    </>
  );
};

export default Swift;
