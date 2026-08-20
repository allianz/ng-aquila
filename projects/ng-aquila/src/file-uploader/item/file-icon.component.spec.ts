import { Component, Directive, signal, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxFileIconComponent } from './file-icon.component';

@Directive({ standalone: true })
abstract class FileIconTest {
  @ViewChild(NxFileIconComponent)
  iconInstance!: NxFileIconComponent;
  extension = signal('pdf');
}

describe('NxFileIconComponent', () => {
  let fixture: ComponentFixture<FileIconTest>;
  let testInstance: FileIconTest;
  let iconInstance: NxFileIconComponent;
  let hostElement: HTMLElement;

  function createTestComponent(component: Type<FileIconTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    iconInstance = testInstance.iconInstance;
    hostElement = fixture.nativeElement.querySelector('nx-file-icon') as HTMLElement;
  }

  function setExtension(value: string) {
    fixture.componentInstance.extension.set(value);
    fixture.detectChanges();
  }

  function label(): HTMLElement | null {
    return hostElement.querySelector('.extension-label');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxFileIconComponent, ConfigurableFileIconComponent, NoExtensionFileIconComponent],
    }).compileComponents();
  }));

  it('should create', () => {
    createTestComponent(ConfigurableFileIconComponent);
    expect(iconInstance).toBeTruthy();
  });

  it('should always render the file icon', () => {
    createTestComponent(ConfigurableFileIconComponent);
    expect(hostElement.querySelector('nx-icon.extension-icon')).toBeTruthy();
  });

  describe('extension label', () => {
    it('should render the extension as label text', () => {
      createTestComponent(ConfigurableFileIconComponent);
      // text-transform: uppercase is applied via CSS, the DOM text keeps the original case
      expect(label()?.textContent?.trim()).toBe('pdf');
    });

    it('should react to extension changes', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('png');
      expect(label()?.textContent?.trim()).toBe('png');
    });

    it('should not render a badge when the extension is empty', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('');
      expect(label()).toBeNull();
    });
  });

  describe('optional input', () => {
    it('should render the icon without a badge when no extension is provided', () => {
      createTestComponent(NoExtensionFileIconComponent);
      expect(hostElement.querySelector('nx-icon.extension-icon')).toBeTruthy();
      expect(hostElement.querySelector('.extension-label')).toBeNull();
    });
  });

  describe('empty extension', () => {
    it('should not render a badge and not throw for empty string', () => {
      createTestComponent(ConfigurableFileIconComponent);
      expect(() => setExtension('')).not.toThrow();
      expect(label()).toBeNull();
    });

    it('should still render the file icon when the extension is empty', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('');
      expect(hostElement.querySelector('nx-icon.extension-icon')).toBeTruthy();
    });
  });

  describe('badge color mapping', () => {
    const cases: {
      ext: string;
      expected: string;
    }[] = [
      { ext: 'pdf', expected: 'badge-red' },
      { ext: 'docx', expected: 'badge-aqua' },
      { ext: 'xlsx', expected: 'badge-green' },
      { ext: 'pptx', expected: 'badge-orange' },
      { ext: 'png', expected: 'badge-purple' },
      { ext: 'zip', expected: 'badge-default' },
      { ext: 'mp4', expected: 'badge-teal' },
    ];

    for (const { ext, expected } of cases) {
      it(`should map ${ext} to ${expected}`, () => {
        createTestComponent(ConfigurableFileIconComponent);
        setExtension(ext);
        expect(label()).toHaveClass(expected);
      });
    }

    it('should map a known extension case-insensitively', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('PDF');
      expect(label()).toHaveClass('badge-red');
      setExtension('Png');
      expect(label()).toHaveClass('badge-purple');
    });

    it('should preserve the original case in the label text while still mapping the color', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('PDF');
      // color lookup is normalized, but the displayed badge text is untouched
      expect(label()?.textContent?.trim()).toBe('PDF');
      expect(label()).toHaveClass('badge-red');
    });

    it('should fall back to badge-default for unknown extensions', () => {
      createTestComponent(ConfigurableFileIconComponent);
      setExtension('xyz');
      expect(label()).toHaveClass('badge-default');
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(ConfigurableFileIconComponent);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-configurable-file-icon-component',
  template: `<nx-file-icon [fileExtension]="extension()"></nx-file-icon>`,
  imports: [NxFileIconComponent],
})
class ConfigurableFileIconComponent extends FileIconTest {}

@Component({
  selector: 'test-no-extension-file-icon-component',
  template: `<nx-file-icon></nx-file-icon>`,
  imports: [NxFileIconComponent],
})
class NoExtensionFileIconComponent extends FileIconTest {}
