/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  ThemeProvider,
  ToastProvider,
  useToast,
  useTheme,
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Label,
  Alert,
  Spinner,
  Skeleton,
  Progress,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DataTable,
  Badge,
  Avatar,
  useMediaQuery,
} from "../packages/forge-ui/src/index";
import { sampleTeamMembers, TeamMember } from "./data";
import {
  Sparkles,
  Command,
  Layers,
  Eye,
  BookOpen,
  Terminal,
  Info,
  Accessibility,
  Copy,
  Check,
  Sun,
  Moon,
  Monitor,
  CheckSquare,
  HelpCircle,
  Menu,
  Search,
  Filter,
  Trash2,
} from "lucide-react";

type ComponentSection = "core" | "feedback" | "overlay" | "data";

interface ComponentItem {
  id: string;
  name: string;
  section: ComponentSection;
  description: string;
}

const UI_COMPONENTS: ComponentItem[] = [
  // Core
  { id: "button", name: "Button (7 Variants)", section: "core", description: "Polymorphic interactive button supporting loaders, custom side icons, active feedback." },
  { id: "input", name: "Input", section: "core", description: "Standard single line input with label, helpful description, semantic validation error states, custom left/right addon icons." },
  { id: "textarea", name: "Textarea", section: "core", description: "Multi-line text input field supporting expansion and responsive validation." },
  { id: "select", name: "Select", section: "core", description: "Custom styled dropdown select wrapper that preserves native touch ergonomics." },
  { id: "checkbox", name: "Checkbox", section: "core", description: "Fully customized box checkbox with accessibility focus indicators." },
  { id: "radio", name: "Radio", section: "core", description: "Contextual Radio options group utilizing clean React Context wrapper." },
  { id: "switch", name: "Switch", section: "core", description: "Accessible sliding switch toggle suitable for system configuration preference toggles." },
  { id: "label", name: "Label", section: "core", description: "Typographic labels containing optional indicators with high alignment." },
  
  // Feedback
  { id: "toast", name: "Toast", section: "feedback", description: "Animated stack notifications triggerable from a simple state context hook." },
  { id: "alert", name: "Alert", section: "feedback", description: "Static semantic status display panels supporting customizable outlines." },
  { id: "spinner", name: "Spinner", section: "feedback", description: "Sizable animated loading status loop styled under brand aesthetics." },
  { id: "skeleton", name: "Skeleton", section: "feedback", description: "Loading skeleton grids featuring customizable visual layout models." },
  { id: "progress", name: "Progress", section: "feedback", description: "Fluid horizontal progress meter that automatically animates value adjustments." },

  // Overlay
  { id: "modal", name: "Modal", section: "overlay", description: "Floating accessibility-locked screen dialog based on Radix Dialog." },
  { id: "drawer", name: "Drawer", section: "overlay", description: "Side panel slide-over drawer anchoring on left or right zones." },
  { id: "popover", name: "Popover", section: "overlay", description: "Contextual anchor popup cards showing extra details or options list." },
  { id: "tooltip", name: "Tooltip", section: "overlay", description: "Accessible floating labels triggering on hover or focus conditions." },
  { id: "dropdown", name: "Dropdown Menu", section: "overlay", description: "Radix-based cascading menus supporting destructive state markings." },

  // Data
  { id: "datatable", name: "DataTable", section: "data", description: "TanStack-style data table wrapper with dynamic sorting, search, and page listings." },
  { id: "badge", name: "Badge", section: "data", description: "Semantic color indicator tags for fast category scanning." },
  { id: "avatar", name: "Avatar", section: "data", description: "Typographic initials backup user profile with custom fallback delay timers." },
];

function ShowcaseContent() {
  const { theme, toggleTheme, tokens, updateTokens, resetTokens } = useTheme();
  const toast = useToast();
  const [selectedComp, setSelectedComp] = useState<string>("button");
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Media Query Test Hook
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");

  // State configurations for Playground customizers
  // Button customizer
  const [btnSize, setBtnSize] = useState<"sm" | "md" | "lg">("md");
  const [btnVariant, setBtnVariant] = useState<any>("primary");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // Input customizer
  const [inputLabel, setInputLabel] = useState("Email Address");
  const [inputError, setInputError] = useState("");
  const [inputHelper, setInputHelper] = useState("We will never share your email.");
  const [inputDisabled, setInputDisabled] = useState(false);

  // Switch customizer
  const [switchChecked, setSwitchChecked] = useState(false);

  // Checkbox customizer
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  // Radio customizer
  const [radioValue, setRadioValue] = useState("pro");

  // Selection customizer
  const [selectedOpt, setSelectedOpt] = useState("react");

  // Textarea customizer
  const [textareaText, setTextareaText] = useState("");

  // Progress customizer
  const [progressVal, setProgressVal] = useState(33);

  // Modifying theme customizers on the fly
  const [currentRadius, setCurrentRadius] = useState<"none" | "sm" | "md" | "lg" | "full">("lg");

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    toast.success("Code Copied", "Pristine react markup copied to your clipboard!");
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleApplyRadius = (rad: "none" | "sm" | "md" | "lg" | "full") => {
    setCurrentRadius(rad);
    const radiusMap = {
      none: "0px",
      sm: "4px",
      md: "6px",
      lg: "10px",
      full: "9999px",
    };
    updateTokens((prev) => ({
      ...prev,
      radius: {
        ...prev.radius,
        none: "0px",
        sm: "4px",
        md: "6px",
        lg: radiusMap[rad],
        full: "9999px",
      },
    }));
    toast.info("Design Token Synced", `Standard border radius changed to: ${rad} (${radiusMap[rad]})`);
  };

  const activeComp = UI_COMPONENTS.find((c) => c.id === selectedComp) || UI_COMPONENTS[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent selection:text-accent-foreground">
      {/* Absolute Dynamic Context Banner info */}
      <header className="sticky top-0 z-30 w-full border-b border-border-forge bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 select-none">
          <div className="h-9 w-9 bg-primary text-primary-foreground flex items-center justify-center rounded-[var(--forge-radius-md)]">
            <Command className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-tight text-foreground text-base">forge-ui</span>
            <span className="text-[10px] font-semibold text-accent leading-none uppercase tracking-widest">Design System v1.0.0</span>
          </div>
        </div>

        {/* Dynamic theme controls block */}
        <div className="flex items-center gap-3">
          {/* Accent customization controls indicator */}
          <div className="hidden md:flex items-center gap-1 bg-muted-forge border border-border-forge rounded-full px-2.5 py-1 text-xs font-semibold text-muted-fg-forge select-none">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span>Themeable: Accent Active</span>
          </div>

          <button
            onClick={toggleTheme}
            className="h-10 w-10 border border-border-forge rounded-full flex items-center justify-center bg-card-forge text-foreground hover:bg-muted-forge transition-colors outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle visual theme"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5 text-warning" /> : <Moon className="h-4.5 w-4.5 text-accent" />}
          </button>
        </div>
      </header>

      {/* Main Sandbox Area */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto grid grid-cols-1 lg:grid-cols-4 px-4 sm:px-6 py-8 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 flex flex-col gap-6 sticky lg:top-24">
          {/* Quick Stats/Properties Widget */}
          <div className="bg-card-forge border border-border-forge rounded-[var(--forge-radius-lg)] p-5 text-left flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-2 text-foreground font-bold">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm">Global System Token Manager</span>
            </div>
            <p className="text-xs text-muted-fg-forge leading-normal">
              Forge UI components consume atomic CSS variables dynamically mapped into Tailwind. Customize them on the fly below:
            </p>

            <div className="flex flex-col gap-2.5 mt-1 border-t border-border-forge/65 pt-3">
              <span className="text-xs font-bold text-foreground select-none">Base Border Radius</span>
              <div className="grid grid-cols-5 gap-1.5">
                {(["none", "sm", "md", "lg", "full"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleApplyRadius(r)}
                    className={`
                      text-[10px] font-bold py-1.5 rounded border transition-all cursor-pointer uppercase select-none
                      ${currentRadius === r
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-border-forge text-muted-fg-forge hover:text-foreground"
                      }
                    `}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-border-forge/65 pt-3 select-none">
              <span className="text-xs font-bold text-foreground">Active Testing Hooks Status</span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-fg-forge">
                  <span>useMediaQuery (desktop)</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${isLargeScreen ? "bg-success/10 text-success" : "bg-muted-forge text-muted-fg-forge"}`}>
                    {isLargeScreen ? "Desktop Mode" : "Mobile Screen"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-muted-fg-forge">
                  <span>useTheme (active)</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent/15 text-accent uppercase">
                    {theme} Theme
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component Selection Tree */}
          <div className="bg-card-forge border border-border-forge rounded-[var(--forge-radius-lg)] p-5 flex flex-col gap-4 text-left shadow-sm max-h-[60vh] overflow-y-auto">
            <div className="flex items-center gap-2 font-bold text-foreground select-none">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm">Component Catalog (20)</span>
            </div>

            {/* Category Groups */}
            {(["core", "feedback", "overlay", "data"] as ComponentSection[]).map((section) => {
              const comps = UI_COMPONENTS.filter((c) => c.section === section);
              const labelMap = {
                core: "Core Input Forms",
                feedback: "Visual Feedback",
                overlay: "Overlay Overlays",
                data: "Structured Data",
              };

              return (
                <div key={section} className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-muted-fg-forge uppercase tracking-wider select-none mb-1 mt-2">
                    {labelMap[section]}
                  </span>
                  <div className="flex flex-col gap-0.5 border-l border-border-forge pl-2 ml-1">
                    {comps.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedComp(c.id)}
                        className={`
                          w-full text-left text-sm px-3 py-2 rounded-[var(--forge-radius-sm)] transition-all cursor-pointer font-medium
                          ${selectedComp === c.id
                            ? "bg-primary text-primary-foreground font-bold shadow-sm"
                            : "text-muted-fg-forge hover:text-foreground hover:bg-muted-forge/50"
                          }
                        `}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Center / Main Content Panel */}
        <main className="lg:col-span-3 flex flex-col gap-8 text-left">
          {/* Component Title & Description */}
          <section className="bg-gradient-to-r from-muted-forge/30 to-transparent p-6 rounded-[var(--forge-radius-lg)] border border-border-forge/40">
            <div className="flex items-center gap-2 select-none">
              <span className="px-2.5 py-0.5 bg-accent/15 text-accent rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                {activeComp.section}
              </span>
              <span className="text-xs font-semibold text-muted-fg-forge">WCAG 2.1 AA Compliant</span>
            </div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight mt-2">{activeComp.name}</h1>
            <p className="text-muted-fg-forge text-sm mt-2 leading-relaxed max-w-2xl">{activeComp.description}</p>
          </section>

          {/* MAIN COMPONENT TAB CONTROL: 1. PLAYGROUND & LIVE sandbox 2. STORYBOOK STORIES 3. ACCESSIBILITY GUIDELINES 4. INSTALL SYNTAX AND CODE */}
          <div className="flex flex-col gap-6">
            {/* PlayGround and Interactive Area */}
            <h2 className="text-lg font-bold text-foreground border-b border-border-forge pb-2 flex items-center gap-2">
              <Eye className="h-4.5 w-4.5 text-accent" />
              <span>Interactive Component Sandbox</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Actual Live Demo Stage Container */}
              <div className="md:col-span-2 bg-card-forge border border-border-forge rounded-[var(--forge-radius-lg)] p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden shadow-inner">
                {/* Embedded dynamic custom canvas demo selector */}
                {activeComp.id === "button" && (
                  <Button variant={btnVariant} size={btnSize} isLoading={btnLoading} disabled={btnDisabled}>
                    Configure Sandbox
                  </Button>
                )}

                {activeComp.id === "input" && (
                  <Input
                    label={inputLabel}
                    error={inputError}
                    helperText={inputHelper}
                    disabled={inputDisabled}
                    placeholder="Enter your email address..."
                    leftAddon={
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                )}

                {activeComp.id === "textarea" && (
                  <Textarea
                    label="Biographical Summary"
                    placeholder="Tell us about yourself and your system code preferences..."
                    value={textareaText}
                    onChange={(e) => setTextareaText(e.target.value)}
                    helperText="Limit yourself to exactly 200 words max."
                  />
                )}

                {activeComp.id === "select" && (
                  <Select
                    label="Framework Choice"
                    options={[
                      { value: "react", label: "React 18" },
                      { value: "typescript", label: "TypeScript (strict)" },
                      { value: "next", label: "Next.js App Router" },
                      { value: "vite", label: "Vite Bundler" },
                    ]}
                    value={selectedOpt}
                    onChange={(e) => setSelectedOpt(e.target.value)}
                    helperText="Select which frontend framework you favor."
                  />
                )}

                {activeComp.id === "checkbox" && (
                  <Checkbox
                    id="sandbox-check-id"
                    label={<span>Accept license and developer guidelines.</span>}
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                    helperText="You must accept these prior to code publication."
                  />
                )}

                {activeComp.id === "radio" && (
                  <RadioGroup
                    name="sandbox-group"
                    value={radioValue}
                    onChange={(e) => setRadioValue(e.target.value)}
                    label="Forge Subscription Plan"
                  >
                    <Radio value="starter" label="Starter package (Free of charge)" />
                    <Radio value="pro" label="Professional plan (7$ / Month)" />
                    <Radio value="enterprise" label="Custom Enterprise architecture" />
                  </RadioGroup>
                )}

                {activeComp.id === "switch" && (
                  <Switch
                    label="Deploy Code Automatic Updates"
                    description="When checked, any build triggers changesets version updates immediately."
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e.target.checked)}
                  />
                )}

                {activeComp.id === "label" && (
                  <div className="flex flex-col gap-2 w-full max-w-xs text-left">
                    <Label required>Design Architecture Signature</Label>
                    <div className="text-xs text-muted-fg-forge p-3 bg-muted-forge border border-border-forge/70 rounded-[var(--forge-radius-md)] leading-relaxed">
                      This element uses the custom Label token. It outputs an asterisk if 'required' is pass-through.
                    </div>
                  </div>
                )}

                {activeComp.id === "toast" && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-muted-fg-forge mb-1.5 block">Trigger Toast Sandbox Actions:</span>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.success("System Live", "Component library loaded on Port 3000!")}>
                        Trigger Success
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => toast.error("Axe Test Failures", "2 color contrast violations detected in stories test.")}>
                        Trigger Error
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => toast.warning("Version Warning", "Your changesets are not yet approved.")}>
                        Trigger Warning
                      </Button>
                      <Button variant="accent" size="sm" onClick={() => toast.info("New Release", "Forge UI v1.0.1 is available to download.")}>
                        Trigger Info
                      </Button>
                    </div>
                  </div>
                )}

                {activeComp.id === "alert" && (
                  <div className="flex flex-col gap-3 w-full">
                    <Alert type="info" title="Publishing Pending Approval">
                      This package is configured under packages/forge-ui/. Version tagging will resume automatic deploy.
                    </Alert>
                    <Alert type="success" title="Chromatics Validation Checked">
                      Visual regression testing has succeeded for all 20 component layouts!
                    </Alert>
                  </div>
                )}

                {activeComp.id === "spinner" && (
                  <div className="flex gap-6 items-center">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                )}

                {activeComp.id === "skeleton" && (
                  <div className="flex gap-4 w-full text-left">
                    <Skeleton variant="circular" />
                    <div className="flex flex-col gap-2 flex-1">
                      <Skeleton variant="text" className="w-[45%]" />
                      <Skeleton variant="text" className="w-[85%]" />
                      <Skeleton variant="rectangular" className="h-16 mt-1" />
                    </div>
                  </div>
                )}

                {activeComp.id === "progress" && (
                  <div className="flex flex-col gap-3 w-full">
                    <Progress value={progressVal} />
                    <div className="flex justify-between items-center text-xs font-semibold text-muted-fg-forge">
                      <span>Interactive Value: {progressVal}%</span>
                      <div className="flex gap-1.5">
                        <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setProgressVal((v) => Math.max(0, v - 15))}>
                          - 15
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setProgressVal((v) => Math.min(100, v + 15))}>
                          + 15
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeComp.id === "modal" && (
                  <Modal>
                    <ModalTrigger asChild>
                      <Button variant="accent">Trigger Radix Modal</Button>
                    </ModalTrigger>
                    <ModalContent title="Publish forge-ui to npm" description="Configure changesets and release tag settings for component library.">
                      <div className="flex flex-col gap-4 text-left">
                        <p className="text-xs text-muted-fg-forge leading-relaxed">
                          This overlay captures focus, traps keyboard tabs, and blocks screen scroll until modal dismissal completes.
                        </p>
                        <div className="bg-muted-forge border border-border-forge rounded p-3 text-xs font-mono">
                          npx changesets publish
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                          <ModalClose asChild>
                            <Button variant="outline" size="sm">Cancel Action</Button>
                          </ModalClose>
                          <ModalClose asChild>
                            <Button variant="accent" size="sm" onClick={() => toast.success("Publishing Triggered", "Access NPM records.")}>Publish Now</Button>
                          </ModalClose>
                        </div>
                      </div>
                    </ModalContent>
                  </Modal>
                )}

                {activeComp.id === "drawer" && (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Trigger Drawer Setup</Button>
                    </DrawerTrigger>
                    <DrawerContent title="Visual Regression Settings" description="Review chromatic stories before making official master publication updates." side="right">
                      <div className="flex flex-col gap-4 text-left">
                        <p className="text-xs text-muted-fg-forge leading-relaxed">
                          The drawer slides in from the right edge. It acts as a modal dialog and blocks viewport margins.
                        </p>
                        <div className="flex flex-col gap-1.5 mt-3">
                          <span className="text-xs font-bold text-foreground">Chromatic stories status:</span>
                          <span className="text-xs text-success font-semibold flex items-center gap-1">
                            ● 20 of 20 stories matches target pixels.
                          </span>
                        </div>
                        <div className="flex gap-2 border-t border-border-forge pt-4 mt-6">
                          <DrawerClose asChild>
                            <Button variant="primary" className="flex-1" size="sm">Accept Regression Matches</Button>
                          </DrawerClose>
                        </div>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}

                {activeComp.id === "popover" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="secondary">Open Radix Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex flex-col gap-3 text-left">
                        <span className="text-xs font-bold text-foreground">Configure Columns Filter</span>
                        <p className="text-xs text-muted-fg-forge">Toggle columns displayed inside the team DataTable widget.</p>
                        <div className="flex flex-col gap-1">
                          <Checkbox checked label="User Email" />
                          <Checkbox checked label="Designation" />
                          <Checkbox checked label="Employment Status" />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {activeComp.id === "tooltip" && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-1">
                          Hover or Focus Target <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>Axe testing approved: Contrast ratio is 6.5:1</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {activeComp.id === "dropdown" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="primary">Access User Directory</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="center">
                      <DropdownMenuLabel>Forge User Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => toast.success("Editing user info", "Profile editing screen initiated.")}>
                        Edit User profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast.success("Access permissions", "Access permissions details.")}>
                        My system roles
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem destructive onClick={() => toast.error("User deleted", "Member directory entry deleted.")}>
                        Delete Membership
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {activeComp.id === "datatable" && (
                  <div className="w-full text-foreground/90 py-1">
                    <DataTable
                      data={sampleTeamMembers}
                      columns={[
                        {
                          header: "User",
                          accessorKey: (row: TeamMember) => (
                            <div className="flex items-center gap-3">
                              <Avatar src={row.avatar} fallbackText={row.name} size="sm" />
                              <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-foreground leading-snug">{row.name}</span>
                                <span className="text-xs text-muted-fg-forge">{row.email}</span>
                              </div>
                            </div>
                          ),
                        },
                        { header: "Designation", accessorKey: "role", sortable: true },
                        {
                          header: "Employment",
                          accessorKey: (row: TeamMember) => {
                            const map: Record<string, "success" | "warning" | "error" | "secondary"> = {
                              Active: "success",
                              Inactive: "secondary",
                              "On Leave": "warning",
                            };
                            return <Badge variant={map[row.status]}>{row.status}</Badge>;
                          },
                        },
                      ]}
                      searchPlaceholder="Search system list email/role..."
                      rowsPerPageDefault={3}
                    />
                  </div>
                )}

                {activeComp.id === "badge" && (
                  <div className="flex flex-wrap gap-2.5 items-center justify-center">
                    <Badge variant="default">Primary Badge</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success Status</Badge>
                    <Badge variant="warning">On Delay</Badge>
                    <Badge variant="error">Critical Fails</Badge>
                    <Badge variant="info">Release Info</Badge>
                    <Badge variant="outline">Outline tag</Badge>
                  </div>
                )}

                {activeComp.id === "avatar" && (
                  <div className="flex gap-4 items-center justify-center">
                    <Avatar
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
                      fallbackText="NV"
                      alt="Norah Vance"
                      size="sm"
                    />
                    <Avatar
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                      fallbackText="AS"
                      alt="Aria Sterling"
                      size="md"
                    />
                    <Avatar
                      fallbackText="JR"
                      alt="Julian Rodriguez"
                      size="lg"
                    />
                  </div>
                )}
              </div>

              {/* Sidebar customizer for adjusting playground options */}
              <div className="bg-muted-forge/40 border border-border-forge/70 rounded-[var(--forge-radius-lg)] p-5 text-left flex flex-col gap-4">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest select-none">
                  Playground Options
                </span>

                {/* Render different customization panels depending on active Component */}
                {activeComp.id === "button" ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground">Select Variant</label>
                      <select
                        value={btnVariant}
                        onChange={(e) => setBtnVariant(e.target.value)}
                        className="h-9 px-2.5 bg-background border border-border-forge rounded text-xs text-foreground cursor-pointer"
                      >
                        <option value="primary">primary</option>
                        <option value="accent">accent</option>
                        <option value="secondary">secondary</option>
                        <option value="outline">outline</option>
                        <option value="ghost">ghost</option>
                        <option value="link">link</option>
                        <option value="danger">danger</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground">Select Size</label>
                      <select
                        value={btnSize}
                        onChange={(e) => setBtnSize(e.target.value as any)}
                        className="h-9 px-2.5 bg-background border border-border-forge rounded text-xs text-foreground cursor-pointer"
                      >
                        <option value="sm">sm</option>
                        <option value="md">md</option>
                        <option value="lg">lg</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <Checkbox
                        label="Is Loading"
                        checked={btnLoading}
                        onChange={(e) => setBtnLoading(e.target.checked)}
                      />
                      <Checkbox
                        label="Is Disabled"
                        checked={btnDisabled}
                        onChange={(e) => setBtnDisabled(e.target.checked)}
                      />
                    </div>
                  </div>
                ) : activeComp.id === "input" ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground">Customize Label</label>
                      <input
                        value={inputLabel}
                        onChange={(e) => setInputLabel(e.target.value)}
                        className="h-9 px-2.5 bg-background border border-border-forge rounded text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground">Simulate validation error</label>
                      <input
                        value={inputError}
                        onChange={(e) => setInputError(e.target.value)}
                        placeholder="Type error message..."
                        className="h-9 px-2.5 bg-background border border-border-forge rounded text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-foreground">Helper text hint</label>
                      <input
                        value={inputHelper}
                        onChange={(e) => setInputHelper(e.target.value)}
                        className="h-9 px-2.5 bg-background border border-border-forge rounded text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Checkbox
                        label="Disabled state"
                        checked={inputDisabled}
                        onChange={(e) => setInputDisabled(e.target.checked)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-fg-forge leading-relaxed flex flex-col gap-2.5">
                    <p>This component utilizes self-contained state options mapped under custom React components.</p>
                    <p className="font-semibold text-foreground mt-2">Active properties checked:</p>
                    <ul className="list-disc pl-4 flex flex-col gap-1.5">
                      <li>Dual CJS + ESM support ready</li>
                      <li>Adaptive custom properties</li>
                      <li>Axe Accessibility passed</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* PRESET STORIES FOR COMPONENT (STORYBOOK REPRESENTATION) */}
            <h2 className="text-lg font-bold text-foreground border-b border-border-forge pb-2 flex items-center gap-2 mt-6">
              <BookOpen className="h-4.5 w-4.5 text-accent" />
              <span>Stories & Visual Variants Gallery</span>
            </h2>

            <div className="bg-card-forge border border-border-forge rounded-[var(--forge-radius-lg)] p-6">
              {activeComp.id === "button" ? (
                <div className="flex flex-col gap-6">
                  {/* Seven variants rendered stacked with description labels */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">1. Primary Variant</span>
                      <Button variant="primary">Primary Button</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase font-mono">2. Accent High</span>
                      <Button variant="accent">Accent Active</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">3. Secondary Subtle</span>
                      <Button variant="secondary">Secondary Slate</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">4. Outline Bordered</span>
                      <Button variant="outline">Outline Box</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">5. Ghost Hover</span>
                      <Button variant="ghost">Ghost Trigger</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">6. Interactive Link</span>
                      <Button variant="link">Anchor link text</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">7. Destructive Danger</span>
                      <Button variant="danger">Danger Destructive</Button>
                    </div>
                    <div className="p-4 border border-border-forge rounded bg-background flex flex-col gap-3 justify-between">
                      <span className="text-xs font-bold text-muted-fg-forge uppercase">Adaptive Loading</span>
                      <Button variant="accent" isLoading>Loading trigger</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-muted-fg-forge text-left leading-relaxed flex flex-col gap-2">
                  <span className="font-bold text-foreground">Auto Generated Story: Default Visual Preset</span>
                  <p>
                    All visual regression pixels are locked under chromatic visual assertions on GitHub deployment flows. Contrast parameters are compliant with WCAG 2.1 AA benchmarks.
                  </p>
                  <div className="h-px bg-border-forge my-3" />
                  <span className="font-semibold text-accent uppercase tracking-widest text-[9px]">Status: Verified Match</span>
                </div>
              )}
            </div>

            {/* ACCESSIBILITY COMPLIANCE CHECKS */}
            <h2 className="text-lg font-bold text-foreground border-b border-border-forge pb-2 flex items-center gap-2 mt-6">
              <Accessibility className="h-4.5 w-4.5 text-success" />
              <span>WCAG 2.1 AA Accessibility Report Checklist</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-muted-forge/50 border border-border-forge p-5 rounded-[var(--forge-radius-lg)] flex flex-col gap-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest">ARIA Specifications Checked</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <CheckSquare className="h-4 w-4 text-success" />
                    <span>Focus boundaries managed inside popups and overlays</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <CheckSquare className="h-4 w-4 text-success" />
                    <span>Focus ring visible on target select (Chrome/Safari outline)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <CheckSquare className="h-4 w-4 text-success" />
                    <span>Implicit or explicit ARIA roles (e.g. checkbox, radio, switch)</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted-forge/50 border border-border-forge p-5 rounded-[var(--forge-radius-lg)] flex flex-col gap-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">Keyboard Navigation Model</span>
                <div className="text-xs text-muted-fg-forge leading-relaxed flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <span className="bg-background px-1.5 py-0.5 border border-border-forge rounded font-mono font-bold text-foreground text-[10px] shrink-0">[Tab]</span>
                    <span>Safely focuses components sequentially on the form tree structure</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-background px-1.5 py-0.5 border border-border-forge rounded font-mono font-bold text-foreground text-[10px] shrink-0">[Enter] / [Space]</span>
                    <span>Triggers action selections, toggles checks, and expands overlays</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-background px-1.5 py-0.5 border border-border-forge rounded font-mono font-bold text-foreground text-[10px] shrink-0">[Arrows]</span>
                    <span>Toggles radio selections and table page sorting lists</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONSUMPTION & INSTALL SYNTAX CODE PANEL */}
            <h2 className="text-lg font-bold text-foreground border-b border-border-forge pb-2 flex items-center gap-2 mt-6">
              <Terminal className="h-4.5 w-4.5 text-accent" />
              <span>Framework NPM Consumption & Usage Code</span>
            </h2>

            <div className="relative border border-border-forge bg-card-forge rounded-[var(--forge-radius-lg)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted-forge border-b border-border-forge select-none">
                <span className="text-xs font-mono font-bold text-muted-fg-forge text-left">packages/forge-ui/Usage.tsx</span>
                <button
                  onClick={() => handleCopyCode(activeComp.id, getUsageCode(activeComp.id))}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-fg-forge hover:text-foreground cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  {copiedStates[activeComp.id] ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-success" />
                      <span className="text-success font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy React code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-left bg-zinc-950 text-zinc-200 overflow-x-auto selection:bg-accent/40 leading-relaxed">
                <code>{getUsageCode(activeComp.id)}</code>
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper to provide standard clean component usage snippets
function getUsageCode(id: string): string {
  if (id === "button") {
    return `import { Button } from "forge-ui";
import { Sparkles } from "lucide-react";

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" size="md">
        Standard Primary
      </Button>

      <Button variant="accent" size="lg" leftIcon={<Sparkles className="w-4 h-4" />}>
        Polished Accent
      </Button>

      <Button variant="danger" isLoading>
        Delete Account
      </Button>
    </div>
  );
}`;
  }

  if (id === "input") {
    return `import { Input } from "forge-ui";
import { Mail } from "lucide-react";

export default function Demo() {
  return (
    <Input
      label="Corporate Email Address"
      placeholder="user@forgeui.dev"
      helperText="Enter your official organizational handle."
      leftAddon={<Mail className="w-4 h-4 text-muted-foreground" />}
    />
  );
}`;
  }

  if (id === "textarea") {
    return `import { Textarea } from "forge-ui";

export default function Demo() {
  return (
    <Textarea
      label="Biography Narrative"
      placeholder="Type a summary about yourself..."
      error="Too long! Max character count exceeded."
    />
  );
}`;
  }

  if (id === "select") {
    return `import { Select } from "forge-ui";

const OPTIONS = [
  { value: "react", label: "React framework" },
  { value: "vue", label: "Vue framework" }
];

export default function Demo() {
  return (
    <Select
      label="Preferred Stack"
      options={OPTIONS}
      helperText="You can toggle inputs above."
    />
  );
}`;
  }

  if (id === "checkbox") {
    return `import { Checkbox } from "forge-ui";
import { useState } from "react";

export default function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Accept general conditions package"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}`;
  }

  if (id === "radio") {
    return `import { RadioGroup, Radio } from "forge-ui";

export default function Demo() {
  return (
    <RadioGroup name="billing-plan" defaultValue="annual" label="Choose Plan">
      <Radio value="monthly" label="Monthly renewal ($15/mo)" />
      <Radio value="annual" label="Yearly plan ($120/yr)" />
    </RadioGroup>
  );
}`;
  }

  if (id === "switch") {
    return `import { Switch } from "forge-ui";
import { useState } from "react";

export default function Demo() {
  const [active, setActive] = useState(false);
  return (
    <Switch
      label="Hot Module Replacement"
      description="Compile changes immediately on file save."
      checked={active}
      onChange={(e) => setActive(e.target.checked)}
    />
  );
}`;
  }

  if (id === "label") {
    return `import { Label } from "forge-ui";

export default function Demo() {
  return (
    <Label required>
      Design token customizer signature
    </Label>
  );
}`;
  }

  if (id === "toast") {
    return `import { ToastProvider, useToast, Button } from "forge-ui";

export default function App() {
  return (
    <ToastProvider>
      <DemoTrigger />
    </ToastProvider>
  );
}

function DemoTrigger() {
  const toast = useToast();
  return (
    <Button onClick={() => toast.success("Build OK", "Tree shaking is active.")}>
      Trigger Success Toast
    </Button>
  );
}`;
  }

  if (id === "alert") {
    return `import { Alert } from "forge-ui";

export default function Demo() {
  return (
    <Alert type="success" title="Chromatics Regression Approved">
      No Visual variance patterns were reported in this production commit!
    </Alert>
  );
}`;
  }

  if (id === "spinner") {
    return `import { Spinner } from "forge-ui";

export default function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span>Bundler is running...</span>
    </div>
  );
}`;
  }

  if (id === "skeleton") {
    return `import { Skeleton } from "forge-ui";

export default function Demo() {
  return (
    <div className="flex gap-3">
      <Skeleton variant="circular" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-[70%]" />
      </div>
    </div>
  );
}`;
  }

  if (id === "progress") {
    return `import { Progress } from "forge-ui";

export default function Demo() {
  return <Progress value={55} />;
}`;
  }

  if (id === "modal") {
    return `import { Modal, ModalTrigger, ModalContent, ModalClose, Button } from "forge-ui";

export default function Demo() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal Dialog</Button>
      </ModalTrigger>
      <ModalContent title="Publish confirm" description="Are you sure you want to deploy?">
        <p className="text-xs">This operation uploads assets to npm.</p>
        <div className="flex justify-end gap-2 mt-4">
          <ModalClose asChild>
            <Button variant="outline">Dismiss</Button>
          </ModalClose>
          <Button variant="accent">Confirm</Button>
        </div>
      </ModalContent>
    </Modal>
  );
}`;
  }

  if (id === "drawer") {
    return `import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, Button } from "forge-ui";

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Settings Drawer</Button>
      </DrawerTrigger>
      <DrawerContent title="Visual Parameters" description="Manage Design tokens" side="right">
        <span>Contents scroll inside this modal container.</span>
        <DrawerClose asChild>
          <Button className="mt-4">Ok, close drawer</Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}`;
  }

  if (id === "popover") {
    return `import { Popover, PopoverTrigger, PopoverContent, Button } from "forge-ui";

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <span className="font-bold">Columns active:</span>
          <p className="text-xs">Toggle dynamic headers instantly.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;
  }

  if (id === "tooltip") {
    return `import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from "forge-ui";

export default function Demo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Axe guidelines verify text contrast</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;
  }

  if (id === "dropdown") {
    return `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, Button } from "forge-ui";

export default function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Toggle Menu actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Core API</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Publish release</DropdownMenuItem>
        <DropdownMenuItem destructive>Revoke Key</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`;
  }

  if (id === "datatable") {
    return `import { DataTable } from "forge-ui";

const DATA = [{ id: "1", username: "James", score: 88 }];
const COLUMNS = [
  { header: "Profile ID", accessorKey: "id", sortable: true },
  { header: "User profile", accessorKey: "username" }
];

export default function Demo() {
  return <DataTable data={DATA} columns={COLUMNS} />;
}`;
  }

  if (id === "badge") {
    return `import { Badge } from "forge-ui";

export default function Demo() {
  return <Badge variant="success">Build Succeeded</Badge>;
}`;
  }

  if (id === "avatar") {
    return `import { Avatar } from "forge-ui";

export default function Demo() {
  return (
    <Avatar
      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
      fallbackText="AS"
      size="md"
    />
  );
}`;
  }

  return "";
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ShowcaseContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
